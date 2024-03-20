export interface ReplyResponseDto {
    replyId: number;
    content: string;
    dateCreateAt: Date;
    dateUpdateAt?: Date | null;
    userId: string;
    commentId: number;
}
