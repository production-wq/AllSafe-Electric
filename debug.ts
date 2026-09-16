import { getAllPosts } from './lib/blog';
getAllPosts().then(posts => console.log(posts.map(p => p.title)));
