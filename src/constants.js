import FairList from './containers/fair-list';
import StallList from './containers/stall-list';
import HireList from './containers/hire-list';

export const activityCategories = [
  { id: 'fairs', name: '摊位招租', component: FairList },
  { id: 'stalls', name: '摊位转租', component: StallList },
  { id: 'hires', name: '兼职招聘', component: HireList },
];
