import CalculateIcon from '@mui/icons-material/Calculate'
import SavingsIcon from '@mui/icons-material/Savings'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PercentIcon from '@mui/icons-material/Percent'
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FunctionsIcon from '@mui/icons-material/Functions'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import StraightenIcon from '@mui/icons-material/Straighten'
import ScaleIcon from '@mui/icons-material/Scale'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import SpeedIcon from '@mui/icons-material/Speed'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import StorageIcon from '@mui/icons-material/Storage'
import PublicIcon from '@mui/icons-material/Public'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import DataObjectIcon from '@mui/icons-material/DataObject'
import VerifiedIcon from '@mui/icons-material/Verified'
import CodeIcon from '@mui/icons-material/Code'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import SearchIcon from '@mui/icons-material/Search'
import LinkIcon from '@mui/icons-material/Link'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import SecurityIcon from '@mui/icons-material/Security'
import ScheduleIcon from '@mui/icons-material/Schedule'
import DescriptionIcon from '@mui/icons-material/Description'
import HtmlIcon from '@mui/icons-material/Html'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import PasswordIcon from '@mui/icons-material/Password'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CasinoIcon from '@mui/icons-material/Casino'
import TimerIcon from '@mui/icons-material/Timer'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import NoteIcon from '@mui/icons-material/Note'

const TOOL_LIST = [
  // Finance
  {
    title: 'EMI Calculator',
    slug: 'emi-calculator',
    description: 'Calculate monthly loan EMI and total interest payable.',
    category: 'Finance',
    icon: <CalculateIcon fontSize="large" />,
  },
  {
    title: 'SIP Calculator',
    slug: 'sip-calculator',
    description: 'Estimate wealth creation through SIP investments.',
    category: 'Finance',
    icon: <SavingsIcon fontSize="large" />,
  },
  {
    title: 'FD Calculator',
    slug: 'fd-calculator',
    description: 'Calculate fixed deposit maturity amount and returns.',
    category: 'Finance',
    icon: <AccountBalanceIcon fontSize="large" />,
  },
  {
    title: 'RD Calculator',
    slug: 'rd-calculator',
    description: 'Calculate recurring deposit maturity value.',
    category: 'Finance',
    icon: <SavingsIcon fontSize="large" />,
  },
  {
    title: 'CAGR Calculator',
    slug: 'cagr-calculator',
    description: 'Calculate compound annual growth rate.',
    category: 'Finance',
    icon: <TrendingUpIcon fontSize="large" />,
  },
  {
    title: 'Retirement Calculator',
    slug: 'retirement-calculator',
    description: 'Estimate retirement corpus and savings required.',
    category: 'Finance',
    icon: <SavingsIcon fontSize="large" />,
  },
  {
    title: 'PPF Calculator',
    slug: 'ppf-calculator',
    description: 'Estimate PPF maturity and returns.',
    category: 'Finance',
    icon: <AccountBalanceIcon fontSize="large" />,
  },
  {
    title: 'EPF Calculator',
    slug: 'epf-calculator',
    description: 'Calculate EPF growth over time.',
    category: 'Finance',
    icon: <AccountBalanceIcon fontSize="large" />,
  },
  {
    title: 'SWP Calculator',
    slug: 'swp-calculator',
    description: 'Plan systematic withdrawals from investments.',
    category: 'Finance',
    icon: <SavingsIcon fontSize="large" />,
  },

  // General Calculators
  {
    title: 'Age Calculator',
    slug: 'age-calculator',
    description: 'Calculate age from date of birth.',
    category: 'Calculator',
    icon: <CalculateIcon fontSize="large" />,
  },
  {
    title: 'Percentage Calculator',
    slug: 'percentage-calculator',
    description: 'Calculate percentages and percentage changes.',
    category: 'Calculator',
    icon: <PercentIcon fontSize="large" />,
  },
  {
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    description: 'Calculate body mass index.',
    category: 'Calculator',
    icon: <MonitorWeightIcon fontSize="large" />,
  },
  {
    title: 'Discount Calculator',
    slug: 'discount-calculator',
    description: 'Calculate discounts and savings.',
    category: 'Calculator',
    icon: <LocalOfferIcon fontSize="large" />,
  },
  {
    title: 'Time Calculator',
    slug: 'time-calculator',
    description: 'Add and subtract time values.',
    category: 'Calculator',
    icon: <AccessTimeIcon fontSize="large" />,
  },
  {
    title: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    description: 'Calculate days between dates.',
    category: 'Calculator',
    icon: <CalendarMonthIcon fontSize="large" />,
  },
  {
    title: 'Salary Hike Calculator',
    slug: 'salary-hike-calculator',
    description: 'Calculate salary increments and growth.',
    category: 'Calculator',
    icon: <TrendingUpIcon fontSize="large" />,
  },

  // Converters
  {
    title: 'Length Converter',
    slug: 'length-converter',
    description: 'Convert between length units.',
    category: 'Converter',
    icon: <StraightenIcon fontSize="large" />,
  },
  {
    title: 'Weight Converter',
    slug: 'weight-converter',
    description: 'Convert between weight units.',
    category: 'Converter',
    icon: <ScaleIcon fontSize="large" />,
  },
  {
    title: 'Temperature Converter',
    slug: 'temperature-converter',
    description: 'Convert Celsius, Fahrenheit and Kelvin.',
    category: 'Converter',
    icon: <DeviceThermostatIcon fontSize="large" />,
  },
  {
    title: 'Speed Converter',
    slug: 'speed-converter',
    description: 'Convert speed units instantly.',
    category: 'Converter',
    icon: <SpeedIcon fontSize="large" />,
  },
  {
    title: 'Area Converter',
    slug: 'area-converter',
    description: 'Convert area measurements.',
    category: 'Converter',
    icon: <CropSquareIcon fontSize="large" />,
  },
  {
    title: 'Volume Converter',
    slug: 'volume-converter',
    description: 'Convert volume units.',
    category: 'Converter',
    icon: <WaterDropIcon fontSize="large" />,
  },
  {
    title: 'Data Storage Converter',
    slug: 'data-storage-converter',
    description: 'Convert KB, MB, GB and TB.',
    category: 'Converter',
    icon: <StorageIcon fontSize="large" />,
  },
  {
    title: 'Time Zone Converter',
    slug: 'timezone-converter',
    description: 'Convert time across regions.',
    category: 'Converter',
    icon: <PublicIcon fontSize="large" />,
  },
  {
    title: 'Roman Numeral Converter',
    slug: 'roman-numeral-converter',
    description: 'Convert Roman numerals and numbers.',
    category: 'Converter',
    icon: <SwapHorizIcon fontSize="large" />,
  },

  // Developer Tools
  {
    title: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format and validate JSON.',
    category: 'Developer',
    icon: <DataObjectIcon fontSize="large" />,
  },
  {
    title: 'YAML Formatter',
    slug: 'yaml-formatter',
    description: 'Format YAML documents.',
    category: 'Developer',
    icon: <CodeIcon fontSize="large" />,
  },
  {
    title: 'Base64 Encoder',
    slug: 'base64-encoder',
    description: 'Encode text to Base64.',
    category: 'Developer',
    icon: <CodeIcon fontSize="large" />,
  },
  {
    title: 'Base64 Decoder',
    slug: 'base64-decoder',
    description: 'Decode Base64 content.',
    category: 'Developer',
    icon: <CodeIcon fontSize="large" />,
  },
  {
    title: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Inspect JWT token payloads.',
    category: 'Developer',
    icon: <VpnKeyIcon fontSize="large" />,
  },
  {
    title: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate random UUIDs.',
    category: 'Developer',
    icon: <FingerprintIcon fontSize="large" />,
  },
  {
    title: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions online.',
    category: 'Developer',
    icon: <SearchIcon fontSize="large" />,
  },
  {
    title: 'URL Encoder',
    slug: 'url-encoder',
    description: 'Encode URL strings safely.',
    category: 'Developer',
    icon: <LinkIcon fontSize="large" />,
  },
  {
    title: 'URL Decoder',
    slug: 'url-decoder',
    description: 'Decode URL encoded strings.',
    category: 'Developer',
    icon: <LinkOffIcon fontSize="large" />,
  },
  {
    title: 'Hash Generator',
    slug: 'hash-generator',
    description: 'Generate MD5, SHA256 and more.',
    category: 'Developer',
    icon: <SecurityIcon fontSize="large" />,
  },
  {
    title: 'Timestamp Converter',
    slug: 'timestamp-converter',
    description: 'Convert Unix timestamps and dates.',
    category: 'Developer',
    icon: <AccessTimeIcon fontSize="large" />,
  },
  {
    title: 'Cron Expression Builder',
    slug: 'cron-expression-builder',
    description: 'Build cron expressions visually.',
    category: 'Developer',
    icon: <ScheduleIcon fontSize="large" />,
  },
  {
    title: 'Markdown Previewer',
    slug: 'markdown-previewer',
    description: 'Preview markdown instantly.',
    category: 'Developer',
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    title: 'HTML Formatter',
    slug: 'html-formatter',
    description: 'Beautify HTML code.',
    category: 'Developer',
    icon: <HtmlIcon fontSize="large" />,
  },

  // Text & Productivity
  {
    title: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words and characters.',
    category: 'Text',
    icon: <TextFieldsIcon fontSize="large" />,
  },
  {
    title: 'Case Converter',
    slug: 'case-converter',
    description: 'Convert text between cases.',
    category: 'Text',
    icon: <TextFieldsIcon fontSize="large" />,
  },
  {
    title: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    description: 'Generate placeholder text.',
    category: 'Text',
    icon: <TextFieldsIcon fontSize="large" />,
  },
  {
    title: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate secure passwords.',
    category: 'Productivity',
    icon: <PasswordIcon fontSize="large" />,
  },
  // {
  //   title: 'QR Code Generator',
  //   slug: 'qr-code-generator',
  //   description: 'Create QR codes instantly.',
  //   category: 'Productivity',
  //   icon: <QrCode2Icon fontSize="large" />,
  // },
  // {
  //   title: 'Barcode Generator',
  //   slug: 'barcode-generator',
  //   description: 'Generate barcode images.',
  //   category: 'Productivity',
  //   icon: <QrCodeIcon fontSize="large" />,
  // },
  {
    title: 'Random Number Generator',
    slug: 'random-number-generator',
    description: 'Generate random numbers.',
    category: 'Productivity',
    icon: <CasinoIcon fontSize="large" />,
  }
]

export default TOOL_LIST

