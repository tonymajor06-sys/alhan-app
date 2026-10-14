import { ImageSourcePropType } from 'react-native';

// The home screen tiles' pictures (drawn for the app, in the same style as the seasons' pictures)
export const homeArt: Record<string, ImageSourcePropType> = {
  hymns: require('../../assets/images/home/hymns.png'),
  responses: require('../../assets/images/home/responses.png'),
  saints: require('../../assets/images/home/saints.png'),
  playlist: require('../../assets/images/home/playlist.png'),
  guide: require('../../assets/images/home/guide.png'),
  faith: require('../../assets/images/home/faith.png'),
  learn: require('../../assets/images/home/learn.png'),
  learnArabic: require('../../assets/images/home/learn-arabic.png'),
  learnEnglish: require('../../assets/images/home/learn-english.png'),
};
