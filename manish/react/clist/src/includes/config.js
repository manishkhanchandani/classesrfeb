const Config = {
  categories: {
    community: {
      name: 'Community',
      priority: 1,
      childs: {
        activities: {
          name: 'Activities',
          priority: 1,
        },
        artists: {
          name: 'Artists',
          priority: 2,
        }
      }
    },
    personals: {
      name: 'Personals',
      priority: 2,
      childs: {
        wfm: {
          name: 'Women Seeking Men',
          priority: 1
        }
      }
    },
    housing: {
      name: 'Housing',
      priority: 3,
      childs: {
        sale: {
          name: 'Buy/Sale House',
          priority: 1
        }
      }
    },
    salebuy: {
      name: 'Sale / Buy',
      priority: 4,
      childs: {
        antiques: {
          name: 'Antiques',
          priority: 1
        }
      }
    },
    rent: {
      name: 'Rent',
      priority: 5,
      childs: {
        antiques: {
          name: 'Antiques',
          priority: 1
        }
      }
    },
    jobs: {
      name: 'Jobs',
      priority: 6,
      childs: {
        accounting: {
          name: 'Accounting/Finance',
          priority: 1
        }
      }
    },
    services: {
      name: 'Services',
      priority: 7,
      childs: {
        computer: {
          name: 'Computer',
          priority: 1
        }
      }
    },
    freelance: {
      name: 'Freelance',
      priority: 8,
      childs: {
        computer: {
          name: 'Computer',
          priority: 1
        }
      }
    },
  }
}

export default Config;