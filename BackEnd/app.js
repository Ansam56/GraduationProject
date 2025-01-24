import axios from'axios';


export const fetchData = async () => {
  try {
    const config = {
      method: 'get',
     // url: `https://api.quran.com/api/v4/chapters/${chapternumber}`,
      url: 'https://api.quran.com/api/v4/chapters',
      headers: { 'Accept': 'application/json' }
    };

    const response = await axios(config);
    /*const allChapterData = [];
    const name =response.data.chapter.name_arabic;
    const verses =response.data.chapter.verses_count;
    const page=response.data.chapter.pages;
    allChapterData.push({"name":name})
    allChapterData.push({"verses":verses})
    allChapterData.push({"page":page})*/
    return response.data.chapters;
   //console.log(allChapterData[1]);
  } catch (error) {
    console.error(error);
  }
};
//fetchData(3)


export const fetchAyah = async (verse_key) => {
  try {
    const config = {
      method: 'get',
      //url: `https://api.quran.com/api/v4/chapters/${chapternumber}`,
      url: `https://api.quran.com/api/v4/verses/by_key/${verse_key}`,
      headers: { 'Accept': 'application/json' }
    };

    const response = await axios(config);
   
    return response.data;
  } catch (error) {
    console.error(error);
  }
};