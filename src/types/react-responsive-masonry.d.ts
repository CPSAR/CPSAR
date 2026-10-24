declare module "react-responsive-masonry" {
  import type { CSSProperties, ReactNode } from "react";

  type MasonryProps = { children?: ReactNode; gutter?: string; className?: string; style?: CSSProperties };
  export default function Masonry(props: MasonryProps): ReactNode;
  export function ResponsiveMasonry(props: MasonryProps & { columnsCountBreakPoints?: Record<number, number> }): ReactNode;
}
