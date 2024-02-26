export const path = {
  root: "/",
  users: "/users",
  user: (id: string) => `/users/${id}`,
  usersNew: "/users/new",
  usersEdit: (id: string) => `/users/${id}/edit`,

  api: {
    tenants: (subdomain: string) => `/api/${subdomain}/tenant`,
  },
}
