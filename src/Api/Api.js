export class ApiArticles {
  async getArticleList(v) {
    const token = localStorage.getItem('token')

    const res = await fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${v}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      console.log(e)
    })
    return res.json()
  }

  async getCurrentArticle(id) {
    const token = localStorage.getItem('token')
    let r = await fetch(`https://blog-platform.kata.academy/api/articles/${id.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      console.log(e)
    })
    return r.json()
  }

  async createArgticle(userData) {
    const token = localStorage.getItem('token')
    const res = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        article: userData,
      }),
    }).catch((e) => {
      console.log(e)
    })
    return res.json()
  }

  async updateArgticle(userData, slug) {
    const token = localStorage.getItem('token')
    const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        article: userData,
      }),
    }).catch((e) => {
      console.log(e)
    })
    return res.json()
  }
  async deleteArgticle(slug) {
    const token = localStorage.getItem('token')
    const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      console.log(e)
    })
    return res
  }

  async markAsFavoriteArgticle(slug, type) {
    const token = localStorage.getItem('token')
    const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: type,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      console.log(e)
    })
    return res.json()
  }
}

export class Authentication {
  async register(name, mail, pass) {
    const res = await fetch('https://blog-platform.kata.academy/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          username: name,
          email: mail,
          password: pass,
        },
      }),
    }).catch((e) => {
      console.log(e)
    })
    return res.json()
  }
  async loginuser(mail, pass) {
    const res = await fetch('https://blog-platform.kata.academy/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          email: mail,
          password: pass,
        },
      }),
    }).catch((e) => {
      console.log(e)
    })
    return res.json()
  }

  async getuser() {
    const token = localStorage.getItem('token')
    const res = await fetch('https://blog-platform.kata.academy/api/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      console.log(e)
    })
    return res.json()
  }
  async updateProfile(userData) {
    const token = localStorage.getItem('token')
    const res = await fetch('https://blog-platform.kata.academy/api/user/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: userData,
      }),
    }).catch((e) => {
      console.log(e)
    })
    return res.json()
  }
}
