const baseUrlAssets = process.env.NEXT_PUBLIC_ASSETS as string;

export function urlImageW300(value: string): string {
  return `${baseUrlAssets}t/p/w440_and_h660_face/${value}`;
}

export function urlImageW1900(value: string): string {
  return `${baseUrlAssets}t/p/w1920_and_h800_multi_faces/${value}`;
}

export function urlImageProfile(value: string): string {
  return `${baseUrlAssets}/t/p/w300_and_h300_face/${value}`;
}
