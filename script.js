class Subject {
  constructor(data) {
    this.data = data;
  }

  next(data) {
    this.data = data;
    this.cb(this.data);
  }

  subscribe(cb) {
    this.cb = cb;
  }

  getValue() {
    return this.data;
  }
}

class App {
  constructor() {
    this.state = {};
    this.subject = new Subject(this.state);

    this.channelsListView = new ChannelsListView(this.subject);
    this.channelsListView.init();

    this.feedListView = new FeedListView(this.subject);
    this.feedListView.init();
  }
}

class ChannelsListView {
  constructor(state) {
    this.state = state;
  }

  init() {
    this.$view = document.querySelector('.channels-list-container');

    this.getData(); 
  }

  render() {
    for (let i = 0; i < this.channels.length - 1; i++) {
      const item = this.channels[i];
      const element = new ChannelsListItem({ title: item.title, id: item.id }, this.state);

      this.$view.appendChild(element.render());
    }
  }

  getData() {
    fetch('channels')
      .then(resp => resp.json())
      .then(channels => {
        this.channels = channels;
        this.render();
      });
  }
}

class ChannelsListItem {
  constructor(data = {}, state) {
    this.title = data.title;
    this.id = data.id;
    this.state = state;
  }

  render() {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'channels-list-item');
    const text = document.createTextNode(this.title);
    this.element.appendChild(text);

    this.element.addEventListener('click', () => this.onClick());

    return this.element;
  }

  getData() {
    fetch(`channels/${this.id}/feed`)
      .then(resp => resp.json())
      .then(feed => {
        this.feed = feed;
        this.state.next(this.feed);
        this.showFeed();
      });
  }

  onClick() {
    this.getData();
  }

  showFeed() {
    console.log('showing feed');
  }
}

class FeedListView {
  constructor(state) {
    this.state = state;

    this.state.subscribe(state => {
      this.render(state);
    });
  }

  init() {
    this.$view = document.querySelector('.feed-container');
  }

  render(state) {
    for (let i = 0; i < state.length; i++) {
      const item = state[i];
      const element = new FeedListItem({ title: item.title, id: item.id });
    }
  }
}

class FeedListItem {
  constructor(data = {}, state) {
    this.state = state;
    this.title = data.title;
  }

  render() {
    this.element = document.createElement('div');
    const text = document.createTextNode(this.title);
    this.element.appendChild(text);
  }
}

window.onload = new App();