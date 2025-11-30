/**
 * YouTube動画IDからサムネイルURLを取得する関数
 * 
 * @param videoId YouTube動画ID
 * @param quality サムネイルの品質 ('maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault')
 * @returns YouTubeサムネイルURL
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" | "mqdefault" | "sddefault" = "maxresdefault"
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * コースの最初の動画IDを取得する関数
 * 
 * @param course コースオブジェクト
 * @returns 最初の動画のYouTube動画ID、存在しない場合はnull
 */
export function getFirstVideoId(course: { sections: Array<{ videos: Array<{ youtubeVideoId: string }> }> }): string | null {
  const firstSection = course.sections[0];
  if (!firstSection) return null;
  
  const firstVideo = firstSection.videos[0];
  if (!firstVideo) return null;
  
  return firstVideo.youtubeVideoId;
}

