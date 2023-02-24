import * as XLSX from "xlsx";
import { COLUMN_INDEX } from "../constants";
export const formatData = (data) => {
  // Start index
  let currentRow = 2;

  const newData = [];
  const merges = [];

  const clusterDataNull = {
    number: null,
    cluster_english: null,
    cluster_deutsch: null,
    source: null,
  };
  const mainTopicDataNull = {
    main_topics_eng: null,
    main_topics_dustch: null,
  };

  data.forEach((item, index) => {
    let isDefaultCluster = true;

    let totalChildsRow = 0;
    let clusterRow = currentRow;

    const clusterData = {
      number: index + 1,
      cluster_english: item.cluster_english,
      cluster_deutsch: item.cluster_deutsch,
      source: item.source?.name,
    };

    /**
     * Main Topic Data
     */
    if (item.main_topics.length) {
      item.main_topics.forEach((itemMain) => {
        let mainTopicRow = currentRow;

        const mainTopicData = {
          main_topics_eng: itemMain.main_topic,
          main_topics_dustch: itemMain.hauptthema,
        };

        /**
         * Sub Topic Data
         */
        if (itemMain.sub_topics.length) {
          totalChildsRow += itemMain.sub_topics.length;

          let isDefaultMainTopic = true;
          let nrSubTopics = 0;
          itemMain.sub_topics.forEach((itemSub) => {
            ++nrSubTopics;
            ++currentRow;
            const newItem = {
              ...(isDefaultCluster ? clusterData : clusterDataNull),
              ...(isDefaultMainTopic ? mainTopicData : mainTopicDataNull),
              sub_topics_dustch: itemSub.unterthema,
              sub_topics_eng: itemSub.sub_topic,
            };
            newData.push(newItem);
            isDefaultCluster = false;
            isDefaultMainTopic = false;
          });

          if (nrSubTopics > 1) {
            // Merge main topic - English
            merges.push(
              XLSX.utils.decode_range(
                `${COLUMN_INDEX.main_topics_eng}${mainTopicRow}:${
                  COLUMN_INDEX.main_topics_eng
                }${mainTopicRow + nrSubTopics - 1}`
              )
            );

            // Merge main topic - Deutch
            merges.push(
              XLSX.utils.decode_range(
                `${COLUMN_INDEX.main_topics_dustch}${mainTopicRow}:${
                  COLUMN_INDEX.main_topics_dustch
                }${mainTopicRow + nrSubTopics - 1}`
              )
            );
            mainTopicRow += nrSubTopics;
          }
        } else {
          const newItem = {
            ...(isDefaultCluster ? clusterData : clusterDataNull),
            ...mainTopicData,
            sub_topics_dustch: "",
            sub_topics_eng: "",
          };
          ++currentRow;
          ++totalChildsRow;
          newData.push(newItem);
        }
      });

      if (totalChildsRow > 1) {
        // Merge cluster topic - Cluster English
        merges.push(
          XLSX.utils.decode_range(
            `${COLUMN_INDEX.cluster_english}${clusterRow}:${
              COLUMN_INDEX.cluster_english
            }${clusterRow + totalChildsRow - 1}`
          )
        );

        // Merge cluster topic - Cluster Deutch
        merges.push(
          XLSX.utils.decode_range(
            `${COLUMN_INDEX.cluster_deutsch}${clusterRow}:${
              COLUMN_INDEX.cluster_deutsch
            }${clusterRow + totalChildsRow - 1}`
          )
        );

        // Merge source
        merges.push(
          XLSX.utils.decode_range(
            `${COLUMN_INDEX.source}${clusterRow}:${COLUMN_INDEX.source}${
              clusterRow + totalChildsRow - 1
            }`
          )
        );

        // Merge stt
        merges.push(
          XLSX.utils.decode_range(
            `${COLUMN_INDEX.stt}${clusterRow}:${COLUMN_INDEX.stt}${
              clusterRow + totalChildsRow - 1
            }`
          )
        );
      }
    } else {
      const newItem = {
        ...clusterData,
        main_topics_eng: "",
        main_topics_dustch: "",
        sub_topics_dustch: "",
        sub_topics_eng: "",
      };
      newData.push(newItem);
      ++currentRow;
    }
  });

  return { newData, merges };
};

export const Heading = [
  {
    number: "STT",
    source: "Source",
    cluster_deutsch: "Cluster Deutsch",
    cluster_english: "Cluster English",
    main_topics_dustch: "Hauptthema",
    main_topics_eng: "Main Topic",
    sub_topics_dustch: "Unterthema",
    sub_topics_eng: "Sub Topic",
  },
];
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
      Math.max(...Heading.map((customer) => customer.sub_topics_eng?.length)) +
      3,
  },
];
