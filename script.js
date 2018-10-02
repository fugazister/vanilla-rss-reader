const MOCK_DATA = [
  {
    id: 0,
    title: 'Beer notes'
  },
  {
    id: 1,
    title: 'Headfonina'
  },
  {
    id: 2,
    title: 'Twitter Engineering'
  },
  {
    id: 3,
    title: 'post-engineering'
  }
]

class App {
  constructor() {
    this.channelsListView = new ChannelsListView();
    this.channelsListView.init();
  }
}

class ChannelsListView {
  constuctor() {}

  init() {
    this.$view = document.querySelector('.channels-list-container');
    this.data = MOCK_DATA;

    this.initialRender();
  }

  initialRender() {
    for (let i = 0; i < this.data.length - 1; i++) {


      let element = new ChannelsListItem({ title: this.data[i].title });

      this.$view.appendChild(element.render());
    }
  }
}

class ChannelsListItem {
  constructor(data = {}) {
    this.title = data.title;
  }

  render() {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'channels-list-item');
    let text = document.createTextNode(this.title);
    this.element.appendChild(text);

    return this.element;
  }
}

class NewsListView {

}

class DetailedView {

}

class ChannelsData {

}

class NewsData {

}

class DetailedData {

}

window.onload = new App();