export const path = {
  root: "/",
  users: {
    index: "/users",
    new: "/users/new",
  },
  employees: {
    index: "/employees",
    new: "/employees/new",
    show: (id: string) => `/users/${id}`,
    edit: (id: string) => `/users/${id}`,
  },
  monthlyPlans: {
    show: "/monthly-plans", // TODO: 年、月、利用者IDをパラメータにする
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
