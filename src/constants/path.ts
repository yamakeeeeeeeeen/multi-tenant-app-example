export const path = {
  root: "/",
  users: "/users",
  user: (id: string) => `/users/${id}`,
  usersNew: "/users/new",
  usersEdit: (id: string) => `/users/${id}/edit`,
  employees: {
    index: "/employees",
    new: "/employees/new",
  },

  api: {
    tenants: {
      new: "/api/tenants",
      show: (subdomain: string) => `/api/${subdomain}/tenants`,
    },
    users: {
      index: (subdomain: string) => `/api/${subdomain}/users`,
      new: (subdomain: string) => `/api/${subdomain}/users`,
    },
    employees: {
      index: (subdomain: string) => `/api/${subdomain}/employees`,
      new: (subdomain: string) => `/api/${subdomain}/employees`,
    },
  },
}
