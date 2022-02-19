import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import moment from '../../node_modules/moment/src/moment.js';

var data;

function getData(cb){
  var xhr = new XMLHttpRequest();
  xhr.open('GET','/data')
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      if (xhr.status==200) {
        cb(null,JSON.parse(xhr.response));
      } else {
        cb(xhr.status);
      }
    }
  };
  xhr.send();
};

function renderRegular(post){
  var postTemp = document.querySelector('#post-temp-regular');
  var postDom = postTemp.cloneNode(true);
  postDom.classList.remove('d-none');
  postDom.classList.add('d-flex');
  postDom.id = post.id;
  postDom.querySelector('.regular-title').innerHTML = post['regular-title'];
  postDom.querySelector('.regular-body').innerHTML = post['regular-body'];
  return postDom;
};

function renderQuote(post){
  var postTemp = document.querySelector('#post-temp-quote');
  var postDom = postTemp.cloneNode(true);
  postDom.classList.remove('d-none');
  postDom.classList.add('d-flex');
  postDom.id = post.id;
  postDom.querySelector('.quote-text').innerHTML = post['quote-text'];
  postDom.querySelector('.quote-source').innerHTML = post['quote-source'];
  return postDom;
};

function renderPhoto(post){
  var postTemp = document.querySelector('#post-temp-photo');
  var postDom = postTemp.cloneNode(true);
  postDom.classList.remove('d-none');
  postDom.classList.add('d-flex');
  postDom.id = post.id;
  postDom.querySelector('.photo-url').src = post['photo-url-500'];
  postDom.querySelector('.photo-caption').innerHTML = post['photo-caption'];
  return postDom;
};

function renderLink(post){
  var postTemp = document.querySelector('#post-temp-link');
  var postDom = postTemp.cloneNode(true);
  postDom.classList.remove('d-none');
  postDom.classList.add('d-flex');
  postDom.id = post.id;
  postDom.querySelector('.link').innerHTML = post['link-text'];
  postDom.querySelector('.link').href = post['url-with-slug'];
  postDom.querySelector('.link-description').innerHTML = post['link-description'];
  return postDom;
};

function renderConversation(post){
  var postTemp = document.querySelector('#post-temp-conversation');
  var postDom = postTemp.cloneNode(true);
  var convList = postDom.querySelector('.convs');
  postDom.classList.remove('d-none');
  postDom.classList.add('d-flex');
  postDom.classList.add('d-flex');
  postDom.id = post.id;
  post.conversation.forEach(function(conv){
    var dom = document.createElement('li');
    dom.classList.add('list-group-item');
    var domUser = document.createElement('span');
    var domText = document.createElement('span');

    domUser.innerHTML = conv.label + '&nbsp;';
    domText.innerHTML = conv.phrase;

    dom.appendChild(domUser);
    dom.appendChild(domText);

    convList.appendChild(dom);

  });
  return postDom;
};


function renderView(){
  document.querySelector('#blog-title').innerHTML = data.tumblelog.title;
  document.querySelector('#blog-desc').innerHTML = data.tumblelog.description;
  document.querySelector('#blog-post-count').innerHTML = 'Total posts : ' + data['posts-total'];

  var postTemp = document.querySelector('#post-temp');
  var postsDom = document.querySelector('#posts');
  var posts = data.posts.sort(function(a,b){
    return a['unix-timestamp']-b['unix-timestamp']
  }).reverse();
  console.log(posts);
  posts.forEach(function(post){
    console.log(post.type,post);
    var postDom;
    switch(post.type){
      case"regular":
        postDom = renderRegular(post);
      break;
      case"quote":
        postDom = renderQuote(post);
      break;
      case"photo":
        postDom = renderPhoto(post);
      break;
      case"link":
        postDom = renderLink(post);
      break;
      case"conversation":
        postDom = renderConversation(post);
      break;
      default:
        postDom = false;
    };
    
    if (postDom) {
      postDom.querySelector('.date').innerHTML = moment(post['date']).format('DD/MM/YYYY');
      postDom.querySelector('.open-window').href = post['url-with-slug'];
      postDom.querySelector('.open-window').setAttribute('target','_blank');
      postDom.querySelector('.open-modal').addEventListener('click',function(){
        openModal(postDom);
      });
      postsDom.appendChild(postDom);
    };
  });
};

function openModal(postDom){
  var modalDom = document.querySelector('#postModal');
  modalDom.querySelector('.modal-body').innerHTML = '';
  modalDom.querySelector('.modal-body').appendChild(postDom.cloneNode(true));
  modalDom.querySelector('.open-modal').remove();
  bootstrap.Modal.getOrCreateInstance(modalDom).show();
};

getData(function(err,res){
  if (err) return console.error(err);
  data = res;
  console.log(data);
  renderView();
});