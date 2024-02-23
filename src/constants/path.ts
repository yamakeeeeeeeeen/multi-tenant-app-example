export const path = {
  root: "/",
  users: "/users",
  user: (id: string) => `/users/${id}`,
  usersNew: "/users/new",
  usersEdit: (id: string) => `/users/${id}/edit`,

  api: {
    tenant: (subdomain: string) => `/api/tenant/${subdomain}`,
  },
}
