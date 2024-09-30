import { timestampFromSeconds } from "../../helpers/time-dates";
import { cn } from "../../tailwind/utils/cn";
import Image from "../Image/Image";

/**
 * TODO:
 *
 * Decision needs to be made about how the timestamp is formatted for app and web
 * Tesla currently will show the hh:mm:ss since the show start that the track appears
 * e.g. 1:16:35, 1 hour 16 minutes 35 seconds into the show
 *
 * Implementation so far is just a function that will format seconds into either hh:mm or mm:ss
 **/

type TrackList = {
  type: "track";
  image: string;
  title: string;
  artist: string;
  timestamp?: number;
};

type ShowDescription = {
  type: "description";
  description: string;
};

export type TrackListUnion = TrackList | ShowDescription;

export interface TrackListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

function TrackListItem({
  className,
  ...props
}: TrackListItemProps & TrackListUnion) {
  if (props.isLoading) {
    return (
      <div className="flex w-full animate-pulse items-center">
        <div className="mr-3 size-12 rounded-lg bg-neutral-dark" />
        <div className="grow">
          <div className="h-4 w-2/3 rounded bg-neutral-dark" />
          <div className="mt-2 h-4 w-1/3 rounded bg-neutral-dark" />
        </div>
      </div>
    );
  }

  if (props.type === "description") {
    return (
      <div
        className={cn(
          "line-clamp-2 w-full text-neutral-darker body-s-medium",
          className,
        )}
        {...props}
      >
        {props.description}
      </div>
    );
  }
  return (
    <div className={cn("flex w-full items-center", className)} {...props}>
      <Image
        width={48}
        height={48}
        alt={`${props.title} - ${props.artist}`}
        src={props.image}
        className="mr-3 rounded-lg"
      />
      <div className="grow">
        <p className="line-clamp-1 text-neutral body-s-bold">{props.title}</p>
        <p className="mt-1 line-clamp-1 text-neutral-darker label-s-semibold">
          {props.artist}
        </p>
      </div>
      {props.timestamp ? (
        <div className="ml-4 justify-end text-neutral-darker label-s-semibold">
          {timestampFromSeconds(props.timestamp, "mm:ss")}
        </div>
      ) : null}
    </div>
  );
}

export { TrackListItem };
