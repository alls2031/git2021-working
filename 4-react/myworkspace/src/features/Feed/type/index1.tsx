interface FeedItemState {
  id: number;
  text: string | undefined;
  url: string | undefined;
  createTime: number;
  modifyTime?: number;
  type: string;
  username?: string | undefined;
  img?: string | undefined;
}

export type { FeedItemState };