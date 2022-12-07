declare module '*.webp';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.tsx';

declare module '*.module.less' {
    const classes: { readonly [key: string]: string }
    export default classes
}