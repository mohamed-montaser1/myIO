import mongoose, { Schema } from "mongoose";
import user from "./user";
import tag from "./tag";

let postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    question: {
      title: {
        type: String,
      },
      answerCount: {
        type: Schema.Types.Number,
        default: 0,
      },
    },
    answer: {
      accepted: {
        type: Boolean,
        default: false,
      },
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    votes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        type: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.statics.paginate = async function ({
  limit = 10,
  page = 1,
  sort = -1,
  where = {},
}) {
  const skip = limit * (page - 1);
  const items = await this.find({ ...where, parent: null })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: sort })
    .populate("user", "name")
    .populate("tags", "name slug")
    .exec();

  const pages = Math.ceil(
    (await this.count({ ...where, parent: null }).exec()) / limit
  );

  return {
    items,
    pages,
  };
};

postSchema.statics.vote = async function (_id, { type, user }) {
  const { n: updated } = await this.updateOne(
    {
      _id,
      "votes.user": user,
    },
    {
      $set: { "votes.$.type": type },
    }
  );
  if (updated) return;
  await this.updateOne(
    { _id },
    {
      $push: { votes: { type, user } },
    }
  );
};

postSchema.virtual("id").get(function () {
  return this._id;
});

postSchema.virtual("votesTotal").get(function () {
  let total = 0;
  for (let vote of this.votes) total += vote.type ? 1 : -1;
});

postSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models?.Post || mongoose.model("Post", postSchema);
