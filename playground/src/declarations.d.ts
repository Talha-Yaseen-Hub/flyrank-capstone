// Global type declarations to satisfy the IDE compiler when node_modules is not yet populated.
// These mock declarations will be overridden once you run `npm install` locally.

declare namespace JSX {
  interface IntrinsicElements {
    [elem: string]: any;
  }
}

declare module 'react' {
  const React: any;
  export default React;
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useId: any;
  export type ReactNode = any;
  export type ElementRef<T> = any;
  export type ComponentPropsWithoutRef<T> = any;
  export type HTMLAttributes<T> = any;
  export type MouseEvent<T = Element, E = any> = any;
  export type KeyboardEvent<T = Element> = any;
  export const forwardRef: any;
}

declare module 'react-dom/client' {
  const ReactDOM: any;
  export default ReactDOM;
}

declare module 'lucide-react' {
  export const Sun: any;
  export const Moon: any;
  export const Sparkles: any;
  export const Terminal: any;
  export const Keyboard: any;
  export const ShieldAlert: any;
  export const X: any;
}

declare module '@radix-ui/react-dialog' {
  export const Root: any;
  export const Trigger: any;
  export const Portal: any;
  export const Close: any;
  export const Overlay: any;
  export const Content: any;
  export const Title: any;
  export const Description: any;
}

declare module '@radix-ui/react-tabs' {
  export const Root: any;
  export const List: any;
  export const Trigger: any;
  export const Content: any;
}

declare module 'clsx' {
  export type ClassValue = any;
  export function clsx(...inputs: any[]): any;
}

declare module 'tailwind-merge' {
  export function extendTailwindMerge(...args: any[]): any;
}
