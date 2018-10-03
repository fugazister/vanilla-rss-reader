const data = {
  channels: [],
  feed: []
};

module.exports = () => {
  for (let i = 0; i < 1000; i++) {
    data.channels.push({ id: i, title: `channel ${i}` });

    for (let t = 0; t < 2000; t++) {
      data.feed.push({
        id: t,
        title: `channel ${i} feed number ${t}`,
        channelId: i
      });
    }
  }


  return data;
}