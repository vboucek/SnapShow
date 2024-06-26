import { type Session } from 'next-auth';
import { useState } from 'react';

import { type Photo } from '@/db/schema/photos';
import { type PostData } from '@/types/post-data';
import {
	localizeDate,
	offsetDateForFormatting
} from '@/utils/date-time-converter';

import { PhotoCarousel } from '../ui/photo-carousel';

import { CommentSection } from './comments/comment-section';
import { PostBottomBar } from './post-bottom-bar';
import { PostProfileBadge } from './post-profile-badge';
import { PostReactions } from './post-reactions';
import { PostText } from './post-text';

type PostProps = {
	post: PostData;
	reactions: {
		id: string;
		userId: string;
		postId: string;
		userPic: string | null | undefined;
	}[];
	photos: Photo[];
	session: Session | null;
};

export const PostCard = ({ post, reactions, photos, session }: PostProps) => {
	const isLiked = !!reactions.find(
		reaction => reaction.userId === session?.user.id
	);

	const toggleComments = () => {
		setCommentsOpen(oldValue => !oldValue);
	};

	const onChangeReaction = () => {
		if (liked) {
			// remove the user
			const newReactions = reacts.filter(r => r.userId !== session?.user.id);
			setReacts(newReactions);
		} else {
			const userReaction = {
				id: 'xyz',
				userId: session!.user.id,
				postId: post.id,
				userPic: session?.user.image
			};
			const newReactions = [userReaction, ...reacts];
			setReacts(newReactions);
		}
		setLiked(prevState => !prevState);
	};

	const [liked, setLiked] = useState(isLiked);
	const [reacts, setReacts] = useState(reactions);
	const [commentsOpen, setCommentsOpen] = useState(false);
	let convertedDate = null;
	if (post?.datetime) {
		convertedDate = new Date(post?.datetime);
		convertedDate = offsetDateForFormatting(localizeDate(convertedDate));
	}

	return (
		<div className="bg-zinc-900 rounded-lg mb-4 p-4 flex flex-col justify-center w-[90vw] md:w-[70vw]">
			<PostProfileBadge
				userId={post.userId}
				eventId={post.eventId}
				datetime={convertedDate}
				venueName={post.venueName}
				eventName={post.eventName}
				venueAddress={post.venueAddress}
				userPic={post.authorPic}
				userName={post.authorUsername}
			/>
			<div className=" pb-6">
				<PostText content={post.comment} />
			</div>
			<PhotoCarousel postPhotos={photos} />
			{reactions && <PostReactions reactions={reacts} postId={post.id} />}
			<PostBottomBar
				postId={post.id}
				isLiked={liked}
				onChangeReaction={onChangeReaction}
				toggleComments={toggleComments}
			/>
			<CommentSection postId={post.id} open={commentsOpen} session={session} />
		</div>
	);
};
