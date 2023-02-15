

export const formatData = (data) => {
  const newData = [];
  const clusterDataNull = {
    number: null,
    cluster_english: null,
    cluster_deutsch: null,
    source: null,
  }
  const mainTopicDataNull = {
    main_topics_eng: null,
    main_topics_dustch: null
  }
  data.forEach((item, index) => {
    let isDefaultCluster = true
    const clusterData = {
      number: index + 1,
      cluster_english: item.cluster_english,
      cluster_deutsch: item.cluster_deutsch,
      source: item.source,
    };
    if (item.main_topics.length) {
      item.main_topics.forEach((itemMain) => {
        const mainTopicData = {
          main_topics_eng: itemMain.main_topic,
          main_topics_dustch: itemMain.hauptthema
        }
        if (itemMain.sub_topics.length) {
          let isDefaultMainTopic = true
          itemMain.sub_topics.forEach((itemSub) => {

            const newItem = {
              ...(isDefaultCluster ? clusterData : clusterDataNull),
              ...(isDefaultMainTopic ? mainTopicData : mainTopicDataNull),
              sub_topics_dustch: itemSub.unterthema,
              sub_topics_eng: itemSub.sub_topic,
            };
            newData.push(newItem);
            isDefaultCluster = false
            isDefaultMainTopic = false
          });
        } else {
          const newItem = {
            ...(isDefaultCluster ? clusterData : clusterDataNull),
            ...mainTopicData,
            sub_topics_dustch: "",
            sub_topics_eng: "",
          };
          newData.push(newItem);
        }
      });
    } else {
      const newItem = {
        ...clusterData,
        main_topics_eng: "",
        main_topics_dustch: "",
        sub_topics_dustch: "",
        sub_topics_eng: "",
      };
      newData.push(newItem);
    }
  });

  return newData
};


export const Heading = [{
  number: "STT",
  source: "Source",
  cluster_deutsch: "Cluster Deutsch",
  cluster_english: "Cluster English",
  main_topics_dustch: "Hauptthema",
  main_topics_eng: "Main Topic",
  sub_topics_dustch: "Unterthema",
  sub_topics_eng: "Sub Topic",
}, ];
export const wscols = [
    {
      wch: Math.max(...Heading.map((customer) => customer.number?.length)),
    },
    { wch: Math.max(...Heading.map((customer) => customer.source?.length)) },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.cluster_deutsch?.length)
      ),
    },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.cluster_english?.length)
      ),
    },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.main_topics_dustch?.length)
      ),
    },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.main_topics_eng?.length)
      ),
    },
    {
      wch: Math.max(
        ...Heading.map((customer) => customer.sub_topics_dustch?.length)
      ),
    },
    {
      wch:
        Math.max(
          ...Heading.map((customer) => customer.sub_topics_eng?.length)
        ) + 3,
    },
  ];

  