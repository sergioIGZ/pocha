// For "hint" about "import path" with "~"
//  Go to "Settings -> Language & Frameworks -> Javascript -> Webpack" and choose this file.
//  https://github.com/nuxt/nuxt.js/issues/2936

// [Possible_alternative]-[BEGIN]
//  https://intellij-support.jetbrains.com/hc/en-us/community/posts/360006380799-NuxtJS-webpack-aliases
//
// Solved by creating ts-shims.d.ts:
// ---
// declare module '*.vue' {
//   import Vue from 'vue'
//   // noinspection JSUnusedGlobalSymbols
//   export default Vue
// }
// ---
// [Possible_alternative]-[END]

// About "path.resolve"
//  https://webpack.js.org/configuration/resolve/

module.exports = {
  resolve: {
    // for IDE (WebStorm, PyCharm, etc)
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  }
}
