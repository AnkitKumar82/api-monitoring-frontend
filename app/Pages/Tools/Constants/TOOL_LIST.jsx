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
import EmiCalculatorPage from '../Components/Finance/EmiCalculator'
import SipCalculatorPage from '../Components/Finance/SipCalculator'
import FdCalculatorPage from '../Components/Finance/FdCalculator'
import RdCalculatorPage from '../Components/Finance/RdCalculator'
import CagrCalculatorPage from '../Components/Finance/CagrCalculator'
import RetirementCalculatorPage from '../Components/Finance/RetirementCalculator'
import PpfCalculatorPage from '../Components/Finance/PpfCalculator'
import EpfCalculatorPage from '../Components/Finance/EpfCalculator'
import SwpCalculatorPage from '../Components/Finance/SwpCalculator'
import AgeCalculatorPage from '../Components/Calculator/AgeCalculator'
import PercentageCalculatorPage from '../Components/Calculator/PercentageCalculator'
import BmiCalculatorPage from '../Components/Calculator/BmiCalculator'
import DiscountCalculatorPage from '../Components/Calculator/DiscountCalculator'
import TimeCalculatorPage from '../Components/Calculator/TimeCalculator'
import DateCalculatorPage from '../Components/Calculator/DateCalculator'
import SalaryHikeCalculatorPage from '../Components/Calculator/SalaryHikeCalculator'
import LengthConverterPage from '../Components/Converter/LengthConverter'
import WeightConverterPage from '../Components/Converter/WeightConverter'
import TemperatureConverterPage from '../Components/Converter/TemperatureConverter'
import SpeedConverterPage from '../Components/Converter/SpeedConverter'
import AreaConverterPage from '../Components/Converter/AreaConverter'
import VolumeConverterPage from '../Components/Converter/VolumeConverter'
import DataStorageConverterPage from '../Components/Converter/DataStorageConverter'
import TimeZoneConverterPage from '../Components/Converter/TimeZoneConverter'
import RomanNumeralConverterPage from '../Components/Converter/RomanNumeralConverter'
import WordCounterPage from '../Components/Text/WordCounter'
import CaseConverterPage from '../Components/Text/CaseConverter'
import LoremIpsumGeneratorPage from '../Components/Text/LoremIpsumGenerator'
import PasswordGeneratorPage from '../Components/Productivity/PasswordGenerator'
import JsonFormatterPage from '../Components/Developer/JsonFormatter'
import YamlFormatterPage from '../Components/Developer/YamlFormatter'
import Base64EncoderPage from '../Components/Developer/Base64Encoder'
import Base64DecoderPage from '../Components/Developer/Base64Decoder'
import UuidGeneratorPage from '../Components/Developer/UuidGenerator'
import RegexTesterPage from '../Components/Developer/RegexTester'
import UrlEncoderPage from '../Components/Developer/UrlEncoder'
import UrlDecoderPage from '../Components/Developer/UrlDecoder'
import HashGeneratorPage from '../Components/Developer/HashGenerator'
import TimestampConverterPage from '../Components/Developer/TimestampConverter'
import CronBuilderPage from '../Components/Developer/CronBuilder'
import MarkdownPreviewerPage from '../Components/Developer/MarkdownPreviewer'
import HtmlFormatterPage from '../Components/Developer/HtmlFormatter'
import JwtDecoderPage from '../Components/Developer/JwtDecoder'
import RandomNumberGeneratorPage from '../Components/Productivity/RandomNumberGenerator'

const TOOL_LIST = [
  // Finance
  {
    title: 'EMI Calculator',
    slug: 'emi-calculator',
    description: 'Calculate monthly loan EMI and total interest payable.',
    category: 'Finance',
    icon: <CalculateIcon fontSize="large" />,
    pageComponent: <EmiCalculatorPage />
  },
  {
    title: 'SIP Calculator',
    slug: 'sip-calculator',
    description: 'Estimate wealth creation through SIP investments.',
    category: 'Finance',
    icon: <SavingsIcon fontSize="large" />,
    pageComponent: <SipCalculatorPage />
  },
  {
    title: 'FD Calculator',
    slug: 'fd-calculator',
    description: 'Calculate fixed deposit maturity amount and returns.',
    category: 'Finance',
    icon: <AccountBalanceIcon fontSize="large" />,
    pageComponent: <FdCalculatorPage />
  },
  {
    title: 'RD Calculator',
    slug: 'rd-calculator',
    description: 'Calculate recurring deposit maturity value.',
    category: 'Finance',
    icon: <SavingsIcon fontSize="large" />,
    pageComponent: <RdCalculatorPage />
  },
  {
    title: 'CAGR Calculator',
    slug: 'cagr-calculator',
    description: 'Calculate compound annual growth rate.',
    category: 'Finance',
    icon: <TrendingUpIcon fontSize="large" />,
    pageComponent: <CagrCalculatorPage />
  },
  {
    title: 'Retirement Calculator',
    slug: 'retirement-calculator',
    description: 'Estimate retirement corpus and savings required.',
    category: 'Finance',
    icon: <SavingsIcon fontSize="large" />,
    pageComponent: <RetirementCalculatorPage />
  },
  {
    title: 'PPF Calculator',
    slug: 'ppf-calculator',
    description: 'Estimate PPF maturity and returns.',
    category: 'Finance',
    icon: <AccountBalanceIcon fontSize="large" />,
    pageComponent: <PpfCalculatorPage />
  },
  {
    title: 'EPF Calculator',
    slug: 'epf-calculator',
    description: 'Calculate EPF growth over time.',
    category: 'Finance',
    icon: <AccountBalanceIcon fontSize="large" />,
    pageComponent: <EpfCalculatorPage />
  },
  {
    title: 'SWP Calculator',
    slug: 'swp-calculator',
    description: 'Plan systematic withdrawals from investments.',
    category: 'Finance',
    icon: <SavingsIcon fontSize="large" />,
    pageComponent: <SwpCalculatorPage />
  },

  // General Calculators
  {
    title: 'Age Calculator',
    slug: 'age-calculator',
    description: 'Calculate age from date of birth.',
    category: 'Calculator',
    icon: <CalculateIcon fontSize="large" />,
    pageComponent: <AgeCalculatorPage />
  },
  {
    title: 'Percentage Calculator',
    slug: 'percentage-calculator',
    description: 'Calculate percentages and percentage changes.',
    category: 'Calculator',
    icon: <PercentIcon fontSize="large" />,
    pageComponent: <PercentageCalculatorPage />
  },
  {
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    description: 'Calculate body mass index.',
    category: 'Calculator',
    icon: <MonitorWeightIcon fontSize="large" />,
    pageComponent: <BmiCalculatorPage />
  },
  {
    title: 'Discount Calculator',
    slug: 'discount-calculator',
    description: 'Calculate discounts and savings.',
    category: 'Calculator',
    icon: <LocalOfferIcon fontSize="large" />,
    pageComponent: <DiscountCalculatorPage />
  },
  {
    title: 'Time Calculator',
    slug: 'time-calculator',
    description: 'Add and subtract time values.',
    category: 'Calculator',
    icon: <AccessTimeIcon fontSize="large" />,
    pageComponent: <TimeCalculatorPage />
  },
  {
    title: 'Date Difference Calculator',
    slug: 'date-difference-calculator',
    description: 'Calculate days between dates.',
    category: 'Calculator',
    icon: <CalendarMonthIcon fontSize="large" />,
    pageComponent: <DateCalculatorPage />
  },
  {
    title: 'Salary Hike Calculator',
    slug: 'salary-hike-calculator',
    description: 'Calculate salary increments and growth.',
    category: 'Calculator',
    icon: <TrendingUpIcon fontSize="large" />,
    pageComponent: <SalaryHikeCalculatorPage />
  },

  // Converters
  {
    title: 'Length Converter',
    slug: 'length-converter',
    description: 'Convert between length units.',
    category: 'Converter',
    icon: <StraightenIcon fontSize="large" />,
    pageComponent: <LengthConverterPage />
  },
  {
    title: 'Weight Converter',
    slug: 'weight-converter',
    description: 'Convert between weight units.',
    category: 'Converter',
    icon: <ScaleIcon fontSize="large" />,
    pageComponent: <WeightConverterPage />
  },
  {
    title: 'Temperature Converter',
    slug: 'temperature-converter',
    description: 'Convert Celsius, Fahrenheit and Kelvin.',
    category: 'Converter',
    icon: <DeviceThermostatIcon fontSize="large" />,
    pageComponent: <TemperatureConverterPage />
  },
  {
    title: 'Speed Converter',
    slug: 'speed-converter',
    description: 'Convert speed units instantly.',
    category: 'Converter',
    icon: <SpeedIcon fontSize="large" />,
    pageComponent: <SpeedConverterPage /> 
  },
  {
    title: 'Area Converter',
    slug: 'area-converter',
    description: 'Convert area measurements.',
    category: 'Converter',
    icon: <CropSquareIcon fontSize="large" />,
    pageComponent: <AreaConverterPage />
  },
  {
    title: 'Volume Converter',
    slug: 'volume-converter',
    description: 'Convert volume units.',
    category: 'Converter',
    icon: <WaterDropIcon fontSize="large" />,
    pageComponent: <VolumeConverterPage />
  },
  {
    title: 'Data Storage Converter',
    slug: 'data-storage-converter',
    description: 'Convert KB, MB, GB and TB.',
    category: 'Converter',
    icon: <StorageIcon fontSize="large" />,
    pageComponent: <DataStorageConverterPage />
  },
  {
    title: 'Time Zone Converter',
    slug: 'timezone-converter',
    description: 'Convert time across regions.',
    category: 'Converter',
    icon: <PublicIcon fontSize="large" />,
    pageComponent: <TimeZoneConverterPage />
  },
  {
    title: 'Roman Numeral Converter',
    slug: 'roman-numeral-converter',
    description: 'Convert Roman numerals and numbers.',
    category: 'Converter',
    icon: <SwapHorizIcon fontSize="large" />,
    pageComponent: <RomanNumeralConverterPage />
  },

  // Developer Tools
  {
    title: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format and validate JSON.',
    category: 'Developer',
    icon: <DataObjectIcon fontSize="large" />,
    pageComponent: <JsonFormatterPage />
  },
  {
    title: 'YAML Formatter',
    slug: 'yaml-formatter',
    description: 'Format YAML documents.',
    category: 'Developer',
    icon: <CodeIcon fontSize="large" />,
    pageComponent: <YamlFormatterPage />
  },
  {
    title: 'Base64 Encoder',
    slug: 'base64-encoder',
    description: 'Encode text to Base64.',
    category: 'Developer',
    icon: <CodeIcon fontSize="large" />,
    pageComponent: <Base64EncoderPage />
  },
  {
    title: 'Base64 Decoder',
    slug: 'base64-decoder',
    description: 'Decode Base64 content.',
    category: 'Developer',
    icon: <CodeIcon fontSize="large" />,
    pageComponent: <Base64DecoderPage />
  },
  {
    title: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Inspect JWT token payloads.',
    category: 'Developer',
    icon: <VpnKeyIcon fontSize="large" />,
    pageComponent: <JwtDecoderPage />
  },
  {
    title: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate random UUIDs.',
    category: 'Developer',
    icon: <FingerprintIcon fontSize="large" />,
    pageComponent: <UuidGeneratorPage />
  },
  {
    title: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions online.',
    category: 'Developer',
    icon: <SearchIcon fontSize="large" />,
    pageComponent: <RegexTesterPage />
  },
  {
    title: 'URL Encoder',
    slug: 'url-encoder',
    description: 'Encode URL strings safely.',
    category: 'Developer',
    icon: <LinkIcon fontSize="large" />,
    pageComponent: <UrlEncoderPage />
  },
  {
    title: 'URL Decoder',
    slug: 'url-decoder',
    description: 'Decode URL encoded strings.',
    category: 'Developer',
    icon: <LinkOffIcon fontSize="large" />,
    pageComponent: <UrlDecoderPage />
  },
  {
    title: 'Hash Generator',
    slug: 'hash-generator',
    description: 'Generate MD5, SHA256 and more.',
    category: 'Developer',
    icon: <SecurityIcon fontSize="large" />,
    pageComponent: <HashGeneratorPage />
  },
  {
    title: 'Timestamp Converter',
    slug: 'timestamp-converter',
    description: 'Convert Unix timestamps and dates.',
    category: 'Developer',
    icon: <AccessTimeIcon fontSize="large" />,
    pageComponent: <TimestampConverterPage />
  },
  {
    title: 'Cron Expression Builder',
    slug: 'cron-expression-builder',
    description: 'Build cron expressions visually.',
    category: 'Developer',
    icon: <ScheduleIcon fontSize="large" />,
    pageComponent: <CronBuilderPage />
  },
  {
    title: 'Markdown Previewer',
    slug: 'markdown-previewer',
    description: 'Preview markdown instantly.',
    category: 'Developer',
    icon: <DescriptionIcon fontSize="large" />,
    pageComponent: <MarkdownPreviewerPage />
  },
  {
    title: 'HTML Formatter',
    slug: 'html-formatter',
    description: 'Beautify HTML code.',
    category: 'Developer',
    icon: <HtmlIcon fontSize="large" />,
    pageComponent: <HtmlFormatterPage />
  },
  
  // Text & Productivity
  {
    title: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words and characters.',
    category: 'Text',
    icon: <TextFieldsIcon fontSize="large" />,
    pageComponent: <WordCounterPage />
  },
  {
    title: 'Case Converter',
    slug: 'case-converter',
    description: 'Convert text between cases.',
    category: 'Text',
    icon: <TextFieldsIcon fontSize="large" />,
    pageComponent: <CaseConverterPage />
  },
  {
    title: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    description: 'Generate placeholder text.',
    category: 'Text',
    icon: <TextFieldsIcon fontSize="large" />,
    pageComponent: <LoremIpsumGeneratorPage />
  },
  {
    title: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate secure passwords.',
    category: 'Productivity',
    icon: <PasswordIcon fontSize="large" />,
    pageComponent: <PasswordGeneratorPage />
  },
  {
    title: 'QR Code Generator',
    slug: 'qr-code-generator',
    description: 'Create QR codes instantly.',
    category: 'Productivity',
    icon: <QrCode2Icon fontSize="large" />,
  },
  {
    title: 'Barcode Generator',
    slug: 'barcode-generator',
    description: 'Generate barcode images.',
    category: 'Productivity',
    icon: <QrCodeIcon fontSize="large" />,
  },
  {
    title: 'Random Number Generator',
    slug: 'random-number-generator',
    description: 'Generate random numbers.',
    category: 'Productivity',
    icon: <CasinoIcon fontSize="large" />,
    pageComponent: <RandomNumberGeneratorPage />
  }
];

export default TOOL_LIST

