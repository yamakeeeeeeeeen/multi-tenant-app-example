export const path = {
  root: '/',
  users: {
    index: '/users',
    new: '/users/new',
    reservations: {
      index: (id: string) => `/users/${id}/reservations`,
    },
  },
  employees: {
    index: '/employees',
    new: '/employees/new',
    show: (id: string) => `/users/${id}`,
    edit: (id: string) => `/users/${id}`,
  },
  api: {
    tenants: {
      new: '/api/tenants',
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
    reservations: {
      index: (
        subdomain: string,
        query: {
          userId: string
          year: number
          month: number
        },
      ) => `/api/${subdomain}/reservations?userId=${query.userId}&year=${query.year}&month=${query.month}`,
      create: (subdomain: string) => `/api/${subdomain}/reservations`,
      update: (subdomain: string, id: string) => `/api/${subdomain}/reservations/${id}`,
      delete: (subdomain: string, id: string) => `/api/${subdomain}/reservations/${id}`,
    },
  },
}
