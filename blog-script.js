const allPosts = []
let nextUniqueId = 100

class User {
    constructor (username) {
        this.username = username
        this.timeJoined = Date.now()
        this.id = nextUniqueId++
    }

    makePost (text) {
        allPosts.push(
            new Post(text, this)
        )
        updateDOM()
    }
}

class Post {
    constructor (text, author) {
        this.body = text
        this.author = author
        this.time = Date.now()
        this.likes = 0
        this.id = nextUniqueId++
    }
}

class Admin extends User {
    constructor (username) {
        super(username)
        this.canDeletePosts = true
    }

    deletePost (postId) {
        if (!this.canDeletePosts) {
            console.log(`You are not authorized to delete posts.`)
            return false
        }

        for (let index = 0; index < allPosts.length; index++) {
            const post = allPosts[index]
            if (post.id === postId) {
                allPosts.splice(index, 1)
                updateDOM()
                return true
            }
        }

        console.log(`No post found with ID: ${postId}.`)
        return false
    }
}

// const updateInterval = setInterval(updateDOM, 1000)

// let peter = new User("Peter Parker")
// peter.makePost("Hi everybody.")

// let bruce = new Admin("Bruce Banner")
// bruce.makePost("Hi Peter, what's up?")

// peter.makePost("I'm Spider-Man.")
// bruce.deletePost(104)