export const path = {
  root: "/",
  users: "/users",
  user: (id: string) => `/users/${id}`,
  usersNew: "/users/new",
  usersEdit: (id: string) => `/users/${id}/edit`,

  api: {
    tenants: {
      new: "/api/tenants",
      show: (subdomain: string) => `/api/${subdomain}/tenants`,
    },
    users: {
      new: (subdomain: string) => `/api/${subdomain}/users`,
    },
  },
}
