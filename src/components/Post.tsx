import moment from "moment";

import heart from "@/assets/icons/heart.svg";
import heartFill from "@/assets/icons/heart-fill.svg";
import useReaction from "@/hooks/useReaction";

const Post = (props: {
  id?: string;
  title?: string;
  href?: string;
  date?: string;
  image?: string;
  isLiked?: boolean;
  isSkeleton?: boolean;
}) => {
  const {
    id = "",
    title = "",
    href = "/",
    date = "",
    image = "",
    isLiked = false,
    isSkeleton = false,
  } = props;
  const { hasReaction, onReaction } = useReaction({
    hasReactionBefore: isLiked,
  });

  return (
    <a href={isSkeleton ? undefined : href}>
      <figure className="relative transition-all group">
        {!isSkeleton ? (
          <img
            src={image}
            width={320}
            height={208}
            alt={title}
            className="rounded-xl bg-slate-100 w-full h-52 lg:w-auto object-cover brightness-[0.3] group-hover:brightness-50  transition-all"
          />
        ) : (
          <div className="w-full h-[208px] rounded-xl bg-slate-100 animate-opacity"></div>
        )}

        {isSkeleton ? (
          ""
        ) : (
          <>
            <figcaption className="mt-1 absolute top-4 px-4">
              <span className="text-slate-50">{moment(date).fromNow()}</span>
              <h3 className="text-lg text-slate-100 font-bold leading-snug">
                {title}
              </h3>
            </figcaption>

            <div className="absolute bottom-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity w-full">
              <span
                className={`${
                  isLiked ? "text-red-500" : "text-slate-900"
                }  rounded-full bg-white w-9 h-9 flex justify-center items-center pt-0.5`}
                onClick={(e) => onReaction(e, id)}
              >
                <img
                  src={hasReaction ? heartFill : heart}
                  width={20}
                  height={20}
                />
              </span>
            </div>
          </>
        )}
      </figure>
    </a>
  );
};

export default Post;
