import FairList from './containers/fair-list';
import StallList from './containers/stall-list';
import HireList from './containers/hire-list';
import FairForm from './components/message-form/fair';
import StallForm from './components/message-form/stall';
import HireForm from './components/message-form/hire';
import {
  publish as publishFair
} from './entities/actions/fairs';
import {
  publish as publishHire
} from './entities/actions/hires';
import {
  publish as publishStall
} from './entities/actions/stalls'; 

export const activityCategories = [
  { id: 'fairs', name: '摊位招租', component: FairList, publishAction: publishFair, publishForm: FairForm, formFields: ['startTime', 'endTime', 'name', 'latitude', 'longitude', 'location', 'description', 'applicantsLimit', 'charge', 'tel'] },
  { id: 'stalls', name: '摊位转租', component: StallList, publishAction: publishStall, publishForm: StallForm, formFields: ['startTime', 'endTime', 'name', 'latitude', 'longitude', 'location', 'description', 'applicantsLimit', 'charge', 'tel']},
  { id: 'hires', name: '兼职招聘', component: HireList, publishAction: publishHire, publishForm: HireForm, formFields: ['startTime', 'endTime', 'name', 'latitude', 'longitude', 'location', 'description', 'applicantsLimit', 'salary', 'tel'] },
];
