// // import Router from 'vue-router'
// export default function ({
//   $auth,
// }) {
//   // $auth.onError((error, name, endpoint) => {
//   // console.log(Router)
//   console.log("vt:" + $auth.hasScope('admin'))
//   //   })
// }
export default function ({
  store,
  redirect,
  route
}) {
  const path = encodeURIComponent(route.path);
  console.log(path)
  // If the user is authenticated redirect to home page
  // if (store.state.auth) {
  //   return redirect('/')
  // }
}
