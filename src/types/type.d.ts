// module.css の型宣言
// https://qiita.com/paranishian/items/bb02c91ec1004430e701
// この記事コピペしただけ。

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
