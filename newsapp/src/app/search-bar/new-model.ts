export interface NewModel {
  new: {
    source:{
      id:string,
      name:string,
    },
    author:string, 
    title:string,
    description:string,
    url:string, 
    urlToImage:string,
    publishedAt:Date,
    content:String,
  }
}
