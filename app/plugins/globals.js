import Vue from 'vue'
import {
  Switch,
  Upload,
  Modal,
  Numberinput,
  Progress,
  Radio,
  Notification,
  Snackbar,
  Toast,
  Field,
  Checkbox,
  Sidebar,
  Select,
  Menu,
  Icon,
  Dropdown,
  Carousel,
  Image,
  Button,
  Tag,
  Table,
  Input,
  Skeleton,
  ConfigProgrammatic,
} from 'buefy'
import DateFilter from '@/utils/date.filter'

Vue.filter('date', DateFilter)

Vue.use(Switch)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Numberinput)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Notification)
Vue.use(Snackbar)
Vue.use(Toast)
Vue.use(Field)
Vue.use(Checkbox)
Vue.use(Sidebar)
Vue.use(Select)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(Carousel)
Vue.use(Image)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Table)
Vue.use(Input)
Vue.use(Skeleton)
ConfigProgrammatic.setOptions({
  defaultIconPack: 'remixicon',

  customIconPacks: {
    remixicon: {
      sizes: {
        default: 'is-size-5',
        'is-small': 'is-size-6',
        'is-medium': 'is-size-3',
        'is-large': 'is-size-1',
      },
      iconPrefix: 'ri-',
      internalIcons: {
        minus: 'subtract-line',
        plus: 'add-line',
        'chevron-right': 'arrow-right-s-line',
        'chevron-left': 'arrow-left-s-line',
      },
    },
  },
})
