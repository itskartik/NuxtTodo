export default function({ store, redirect }) {
  if (store.state.user.uid == "") {
    return redirect("/signin");
  }
}

//todo rewrite the middleware use actions to create this and call here....
