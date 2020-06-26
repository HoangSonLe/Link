using i3Solution.Library.Model;
using Link2.Web.Models;
using Link2.Web.ModelsView;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace Link2.Web.Controllers
{
    public class LinkController : ApiController
    {
        #region Default
        //Mock Data
        private static List<Handshake> listHandshakes = new List<Handshake>() {
            new Handshake()
            {
                Value = 1,
                Label = "None"
            },
            new Handshake()
            {
                Value = 2,
                Label = "XOnXOff"
            },
            new Handshake()
            {
                Value = 3,
                Label = "RequestToSend"
            },
            new Handshake()
            {
                Value = 4,
                Label = "RequestToSendXOnXOff"
            }
        };
        private static List<Parity> listParities = new List<Parity>()
        {
            new Parity()
            {
                Value = 1,
                Label = "None"
            },
            new Parity()
            {
                Value = 2,
                Label = "Odd"
            },
            new Parity()
            {
                Value = 3,
                Label = "Even"
            },
            new Parity()
            {
                Value = 4,
                Label = "Mark"
            },
            new Parity()
            {
                Value = 5,
                Label = "Space"
            }
        };
        private static List<StopBits> listStopBitses = new List<StopBits>()
        {
            new StopBits()
            {
                Value = 1,
                Label = "One"
            },
            new StopBits()
            {
                Value = 2,
                Label = "Two"
            },
            new StopBits()
            {
                Value = 3,
                Label = "OnePointFive"
            },
        };
        private static List<BaudRate> listBaudRates = new List<BaudRate>(){
            new BaudRate()
            {
                Value = 9600,
                Label = "9600"
            },
            new BaudRate()
            {
                Value = 14400,
                Label = "14400"
            },
            new BaudRate()
            {
                Value = 19200,
                Label = "19200"
            },
            new BaudRate()
            {
                Value = 38400,
                Label = "38400"
            },
            new BaudRate()
            {
                Value = 57600,
                Label = "57600"
            },
            new BaudRate()
            {
                Value = 115200,
                Label = "115200"
            },
            new BaudRate()
            {
                Value = 128000,
                Label = "128000"
            },
            new BaudRate()
            {
                Value = 256000,
                Label = "256000"
            }
        };
        private static List<MachineType> listMachineTypes = new List<MachineType>()
        {
            new MachineType()
            {
                Label= "Erytra",
                Value= 1
            },
            new MachineType()
            {
                Label= "DG Reader",
                Value= 2
            },
            new MachineType()
            {
                Label= "Wadiana",
                Value= 3
            },
            new MachineType()
            {
                Label= "Erytra Eflexis",
                Value= 4
            },
            new MachineType()
            {
                Label= "DG Reader Net",
                Value= 5
            }
        };
        private static List<LisCommunationMode> listLisCommunationModes = new List<LisCommunationMode>()
        {
            new LisCommunationMode()
            {
                Label= "File sharing",
                Value=4000
            },
            new LisCommunationMode()
            {
                Label= "Serial Port",
                Value=4001
            },
            new LisCommunationMode()
            {
                Label= "TCP/IP",
                Value=4002
            },
        };
        private static List<LisSystem> listLisSytem = new List<LisSystem>()
        {
            new LisSystem()
            {
                CanDelete = true,
                Id =  33,
                Name = "Serial Channel",
                CommunicationMode =  (int)EnumLink.LisSystemType.SerialChannel,
                IsActive = true,
                SendQCResult = false,
                AutoExport = true,
                TimeZoneId = "Aleutian Standard Time",
                SerialChannel = new SerialChannel(){
                    Id= 47,
                    PortName="COM1",
                    BaudRate= 9600,
                    DTSDSR = false,
                    RTSCTS = false,
                    Handshake= 1,
                    TimeOut=  1,
                    Parity=  1,
                    StopBits = 3,
              },
              FolderChannel = new FolderChannel(),
              TCPChannel = new TCPChannel(),
            },
            new LisSystem()
            {
                CanDelete = true,
                Id =  34,
                Name = "TCP Channel 233",
                CommunicationMode = (int)EnumLink.LisSystemType.TCPChannel,
                IsActive = true,
                SendQCResult = true,
                AutoExport = true,
                TimeZoneId = "Aleutian Standard Time",
                SerialChannel = new SerialChannel(),
              FolderChannel = new FolderChannel(),
              TCPChannel = new TCPChannel(){
                  Id=12,
                  Ip="192.168.1.1",
                  Port=10,
                  TimeOut=10
              }
            },
            new LisSystem()
            {
                CanDelete = true,
                Id =  35,
                Name = "Folder Channel",
                CommunicationMode =  (int)EnumLink.LisSystemType.FolderChannel,
                IsActive = true,
                SendQCResult = true,
                AutoExport = true,
                TimeZoneId = "Aleutian Standard Time",
                SerialChannel = new SerialChannel(),
              FolderChannel = new FolderChannel(){ 
                Id=13,
                InputFile="E:\\DevSource",
                OutputFile="E:\\DevSource",
                RootFolder="E:\\DevSource",
                NeedAck= true
              },
              TCPChannel = new TCPChannel()
            }
        };
        private static List<Instrument> listInstruments = new List<Instrument>()
        {
                new Instrument(){
                    Id = 1,
                    MachineType =1,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\1-1",
                    AutoSendToHost =false,
                    IsActive =true,
                    IsAssigned =false,
                    Name ="Erytra AT1000",
                    SerialNumber ="AT000001",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"
                },
                new Instrument(){
                    Id = 2,
                    MachineType =2,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\2-1",
                    AutoSendToHost =false,
                    IsActive =true,
                    IsAssigned =false,
                    Name ="DGReader",
                    SerialNumber ="1560",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"
                },
                new Instrument(){
                    Id = 3,
                    MachineType =3,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\3-1",
                    AutoSendToHost =false,
                    IsActive =true,
                    IsAssigned =false,
                    Name ="Waidiana3",
                    SerialNumber ="57-0694",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"
                },
                new Instrument(){
                    Id = 4,
                    MachineType =4,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\1-2",
                    AutoSendToHost =false,
                    IsActive =true,
                    IsAssigned =false,
                    Name ="Eflexis",
                    SerialNumber ="0508",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"
                },
                new Instrument(){
                    Id = 5,
                    MachineType =5,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\1-2",
                    AutoSendToHost =false,
                    IsActive =true,
                    IsAssigned =false,
                    Name ="DGReader Net",
                    SerialNumber ="0491",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"},

        };
        private static List<Lis> listLis = new List<Lis>()
            {
                new Lis(){LisId= 1, IsMirror =false, RouterID = 1, LisSystem = listLisSytem[0]},
                new Lis(){LisId= 2, IsMirror =false, RouterID = 1, LisSystem = listLisSytem[1]},
                new Lis(){LisId= 3, IsMirror =false, RouterID = 1, LisSystem = listLisSytem[2]},
                new Lis(){LisId= 1, IsMirror =false, RouterID = 2, LisSystem = listLisSytem[0]},
                new Lis(){LisId= 2, IsMirror =false, RouterID = 2, LisSystem = listLisSytem[1]},
                new Lis(){LisId= 3, IsMirror =false, RouterID = 2, LisSystem = listLisSytem[2]},
                new Lis(){LisId= 1, IsMirror =false, RouterID = 3, LisSystem = listLisSytem[0]},
                new Lis(){LisId= 2, IsMirror =false, RouterID = 3, LisSystem = listLisSytem[1]},
                new Lis(){LisId= 3, IsMirror =false, RouterID = 3, LisSystem = listLisSytem[2]},

            };
        private static List<Laboratory> listLaboratories = new List<Laboratory>()
        {
                new Laboratory(){
                    Id =1,
                    LisInRouters =new List<Lis>(),
                    Name ="Lab Vall",
                    Priority =1,
                    TimeZoneId ="Aleutian Standard Time",
                    LisInstruments= new List<Instrument>()
                },

        };
        private static List<TimeZones> listTimeZones = new List<TimeZones>()
        {
            new TimeZones()
             {
                Label= "(UTC-12:00) International Date Line West",
                Value = "Dateline Standard Time"
             },
            new TimeZones()
             {
                Label= "(UTC-11:00) Coordinated Universal Time-11",
                Value = "UTC-11"
             },
            new TimeZones()
             {
                Label= "(UTC-10:00) Aleutian Islands",
                Value = "Aleutian Standard Time"
             },
            new TimeZones()
             {
                Label= "(UTC-10:00) Hawaii",
                Value = "Hawaiian Standard Time"
             },
            new TimeZones()
             {
                Label= "(UTC-09:30) Marquesas Islands",
                Value = "Marquesas Standard Time"
             },
            new TimeZones()
             {
                Label= "UTC-09:00) Alaska",
                Value = "Alaskan Standard Time"
             },
            new TimeZones()
             {
                Label= "(UTC-09:00) Coordinated Universal Time-09",
                Value = "UTC-09"
             },

        };
        #endregion
        #region GetDefaultData
        //API get data default
        [HttpGet]
        public Acknowledgement<TCPChannel> GetDefaultTcpSetting()
        {
            var ack = new Acknowledgement<TCPChannel>();
            ack.Data = new TCPChannel()
            {
                Id = 0,
                Ip = null,
                Port = 0,
                TimeOut = 10
            };
            ack.IsSuccess = true;
            return ack;
        }
        [HttpGet]
        public Acknowledgement<SerialChannel> GetDefaultSerialSetting()
        {
            var ack = new Acknowledgement<SerialChannel>();
            ack.Data = new SerialChannel()
            {
                BaudRate = 9600,
                DTSDSR = false,
                Handshake= 0,
                Id=  0,
                Parity= 0,
                PortName= null,
                RTSCTS = false,
                StopBits= 1,
                TimeOut= 0
            };
            ack.IsSuccess = true;
            return ack;
        }
        [HttpGet]
        public Acknowledgement<FolderChannel> GetDefaultFolderSetting()
        {
            var ack = new Acknowledgement<FolderChannel>();
            ack.Data = new FolderChannel()
            {
                Id = 0,
                RootFolder= null,
                InputFile= null,
                OutputFile = null,
                NeedAck= false
            };
            ack.IsSuccess = true;
            return ack;
        }
        
        [HttpGet]
        public Acknowledgement<List<MachineType>> GetOptionsForAnalyser()
        {
            var ack = new Acknowledgement<List<MachineType>>();
            ack.Data = listMachineTypes;
            ack.IsSuccess = true;
            return ack;
        }
        public Acknowledgement<List<TimeZones>> GetOptionsForLabEditting()
        {
            var ack = new Acknowledgement<List<TimeZones>>();
            ack.Data = listTimeZones;
            ack.IsSuccess = true;
            return ack;
        }
        #endregion
        //API get data
        [HttpGet]
        public Acknowledgement<LabConfigurationDefault> GetLabConfigurationDefault()
        {
            var ack = new Acknowledgement<LabConfigurationDefault>();
            ack.Data = new LabConfigurationDefault() {
                Lab = new LabModelView() {
                    LabList = new List<Laboratory>(),
                    NewLab = new Laboratory()
                },
                Lis = new LisModelView() {
                    LisList = new List<LisSystem>(),
                    NewLis = new LisSystem()
                    {
                        AutoExport = true,
                        CommunicationMode = listLisCommunationModes[0].Value,
                        FolderChannel = new FolderChannel(),
                        SerialChannel = new SerialChannel() {
                            TimeOut = 0,
                            BaudRate = listBaudRates[0].Value,
                            Handshake = listHandshakes[0].Value,
                            Parity = listParities[0].Value,
                            StopBits = listStopBitses[0].Value,
                        },
                        TCPChannel = new TCPChannel()
                        {
                            TimeOut = 10
                        }
                    }
                },
                Instrument = new InstrumentModelView()
                {
                    InstrumentList = new List<Instrument>(),
                    NewInstrument = new Instrument()
                    {
                        IsAssigned = false
                    }
                }
            };
            ack.IsSuccess = true;
            return ack;
        }
        #region LisSystems
        
        [HttpGet]
        public Acknowledgement<List<LisSystem>> GetLisSystems()
        {
            var ack = new Acknowledgement<List<LisSystem>>();
            ack.Data = listLisSytem;
            ack.IsSuccess = true;
            return ack;
        }
        [HttpPost]
        public Acknowledgement<LisSystem> AddOrUpdateLisSystem(LisSystem lisSystem)
        {
            var ack = new Acknowledgement<LisSystem>();
            //Validate
            var validate = ValidateLisSystem(lisSystem);
            if (validate.IsSuccess == false)
            {
                ack.ErrorMessage = validate.ErrorMessage;
                ack.IsSuccess = false;
                return ack;
            }
            //
            var lis = listLisSytem.Find(p => p.Id == lisSystem.Id);
            switch (lisSystem.CommunicationMode)
            {
                case (int)EnumLink.LisSystemType.FolderChannel:
                    lisSystem.SerialChannel = new SerialChannel();
                    lisSystem.TCPChannel = new TCPChannel();
                    break;
                case (int)EnumLink.LisSystemType.SerialChannel:
                    lisSystem.FolderChannel = new FolderChannel();
                    lisSystem.TCPChannel = new TCPChannel();
                    break;
                case (int)EnumLink.LisSystemType.TCPChannel:
                    lisSystem.FolderChannel = new FolderChannel();
                    lisSystem.SerialChannel = new SerialChannel();
                    break;
                default:
                    break;
            }
            if (lis == null)
            {
                lisSystem.Id = listLisSytem.Count() + 1;
                lisSystem.CanDelete = true;
                listLisSytem.Add(lisSystem);
            }
            else
            {

                lis.Name = lisSystem.Name;
                lis.IsActive = lisSystem.IsActive;
                lis.SendQCResult = lisSystem.SendQCResult;
                lis.SerialChannel = lisSystem.SerialChannel;
                lis.TCPChannel = lisSystem.TCPChannel;
                lis.FolderChannel = lisSystem.FolderChannel;
                lis.CanDelete = lisSystem.CanDelete;
                lis.AutoExport = lisSystem.AutoExport;
                lis.CommunicationMode = lisSystem.CommunicationMode;
                lis.TimeZoneId = lisSystem.TimeZoneId;
            }
            ack.Data = lisSystem;
            ack.IsSuccess = true;
            return ack;
        }
        [HttpPost]
        public Acknowledgement DeleteLisSystem(int? id)
        {
            var ack = new Acknowledgement();
            if (id != null)
            {

                var tmp = listLisSytem.Find(p => p.Id == id);
                if (tmp.CanDelete)
                {
                    listLisSytem.Remove(tmp);
                    ack.IsSuccess = true;
                    return ack;
                }
            }
            ack.IsSuccess = false;
            return ack;
        }
        [HttpGet]
        public Acknowledgement<OptionsForLisEdit> GetOptionsForLisEdit()
        {
            var ack = new Acknowledgement<OptionsForLisEdit>();
            ack.Data = new OptionsForLisEdit()
            {
                BaudRate = listBaudRates,
                Handshake = listHandshakes,
                Parity = listParities,
                StopBits = listStopBitses,
                LisCommunationMode = listLisCommunationModes,
                TimeZones = listTimeZones
            };
            ack.IsSuccess = true;
            return ack;
        }
        public Acknowledgement<LisSystem> ValidateLisSystem(LisSystem lisSystem)
        {
            var ack = new Acknowledgement<LisSystem>();
            if(string.IsNullOrEmpty(lisSystem.Name))
            {
                ack.AddMessage("LIS name field must be filled");
                ack.IsSuccess = false;
                return ack;
            }
            if ( string.IsNullOrEmpty(lisSystem.TimeZoneId))
            {
                ack.AddMessage("Value of TimeZone is invalid");
                ack.IsSuccess = false;
                return ack;
            }
            if (lisSystem.CommunicationMode== (int)EnumLink.LisSystemType.FolderChannel)
            {
                if(string.IsNullOrEmpty(lisSystem.FolderChannel.RootFolder))
                {
                    ack.AddMessage("Root folder field must be filled");
                    ack.IsSuccess = false;
                    return ack;
                }
                if ( string.IsNullOrEmpty(lisSystem.FolderChannel.InputFile))
                {
                    ack.AddMessage("Input file field must be filled");
                    ack.IsSuccess = false;
                    return ack;
                }
                if ( string.IsNullOrEmpty(lisSystem.FolderChannel.OutputFile))
                {
                    ack.AddMessage("Output file field must be filled");
                    ack.IsSuccess = false;
                    return ack;
                }
            }
            if (lisSystem.CommunicationMode == (int)EnumLink.LisSystemType.SerialChannel)
            {
                if (string.IsNullOrEmpty(lisSystem.SerialChannel.PortName) || !lisSystem.SerialChannel.PortName.Contains("COM"))
                {
                    ack.AddMessage("Value of Port Name is invalid");
                    ack.IsSuccess = false;
                    return ack;
                }
                if (lisSystem.SerialChannel.TimeOut <= 0)
                {
                    ack.AddMessage("Value of Timeout must be greater than or equal to 1");
                    ack.IsSuccess = false;
                    return ack;
                }

                if (listBaudRates.Find(x=>x.Value==lisSystem.SerialChannel.BaudRate) == null) {
                    ack.AddMessage("Value of BaudRate must be selected");
                    ack.IsSuccess = false;
                    return ack;
                }
                if (listHandshakes.Find(x => x.Value == lisSystem.SerialChannel.Handshake) == null)
                {
                    ack.AddMessage("Value of Handshake must be selected");
                    ack.IsSuccess = false;
                    return ack;
                }
                if (listParities.Find(x => x.Value == lisSystem.SerialChannel.Parity) == null)
                {
                    ack.AddMessage("Value of Parity must be selected");
                    ack.IsSuccess = false;
                    return ack;
                }
                if (listStopBitses.Find(x => x.Value == lisSystem.SerialChannel.StopBits) == null)
                {
                    ack.AddMessage("Value of StopBits must be selected");
                    ack.IsSuccess = false;
                    return ack;
                }
            }
            if (lisSystem.CommunicationMode == (int)EnumLink.LisSystemType.TCPChannel)
            {
                if ( string.IsNullOrEmpty(lisSystem.TCPChannel.Ip))
                {
                    ack.AddMessage("Value of TCP/IP Address must be filled");
                    ack.IsSuccess = false;
                    return ack;
                }
                if (lisSystem.TCPChannel.Port <=0 )
                {
                    ack.AddMessage("Valalue of TCP/IP Port must be greater than or equ to 1");
                    ack.IsSuccess = false;
                    return ack;
                }
                if (!IsValidateIP(lisSystem.TCPChannel.Ip))
                {
                    ack.AddMessage("TCP/IP does not match the input pattern");
                    ack.IsSuccess = false;
                    return ack;
                }
                
            }

            ack.IsSuccess = true;
            return ack;
        }
        public bool IsValidateIP(string Address)
        {
            //Match pattern for IP address    
            string Pattern = @"^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$";
            //Regular Expression object    
            Regex check = new Regex(Pattern);

            //check to make sure an ip address was provided    
            if (string.IsNullOrEmpty(Address))
                //returns false if IP is not provided    
                return false;
            else
                //Matching the pattern    
                return check.IsMatch(Address, 0);
        }
        #endregion

        #region Instrument
        [HttpGet]
        public Acknowledgement<List<Instrument>> GetInstruments()
        {
            var ack = new Acknowledgement<List<Instrument>>();
            ack.Data = listInstruments;
            ack.IsSuccess = true;
            return ack;
        }
        [HttpPost]
        public Acknowledgement DeleteInstrument(int? id)
        {
            var ack = new Acknowledgement();
            if (id!= null)
            {

                var tmp=listInstruments.Find(p=>p.Id== id);
                if (!tmp.IsAssigned)
                {
                    listInstruments.Remove(tmp);
                    ack.IsSuccess = true;
                    return ack;
                }
                
            }
            ack.AddMessage("Lỗi");
            ack.IsSuccess = false;
            return ack;
        }
        [HttpPost]
        public Acknowledgement<Instrument> AddOrUpdateInstrument(Instrument ins)
        {
            var ack = new Acknowledgement<Instrument>();
            //Validate
            var validate = ValidateInstrument(ins);
            if (validate.IsSuccess == false)
            {
                ack.ErrorMessage = validate.ErrorMessage;
                ack.IsSuccess = false;
                return ack;
            }
            //Gán ảnh
            
            //switch (ins.MachineType)
            //{
            //    case (int)EnumLink.InstrumentType.Erytra:
            //        ins.Image = "erytra.jpg";
            //        break;
            //    case (int)EnumLink.InstrumentType.ErytraEflexis:
            //        ins.Image = "erytra-eflexis.jpg";
            //        break;
            //    case (int)EnumLink.InstrumentType.DGReader:
            //        ins.Image = "dgreader.png";
            //        break;
            //    case (int)EnumLink.InstrumentType.DGReaderNet:
            //        ins.Image = "dgreader-net.jpg";
            //        break;
            //    case (int)EnumLink.InstrumentType.Wadiana:
            //        ins.Image = "diana.png";
            //        break;
            //    default: break;
            //}
            
            //Kiểm tra Add or Update
            var inst = listInstruments.Find(p => p.Id == ins.Id);
            if (inst == null)
            {
                ins.Id = listInstruments.Count() + 1;
                listInstruments.Add(ins);
            }
            else
            {
                inst.IsActive = ins.IsActive;
                inst.IsAssigned = ins.IsAssigned;
                inst.AutoSendToHost = ins.AutoSendToHost;
                inst.MachineType = ins.MachineType;
                inst.Name = ins.Name;
                inst.SerialNumber = ins.SerialNumber;
                inst.TanFolder = ins.TanFolder;
                inst.AstmFolder = ins.AstmFolder;

            }
            ack.Data = ins;
            ack.IsSuccess = true;
            return ack;
        }
        public Acknowledgement<Instrument> ValidateInstrument(Instrument ins)
        {
            var ack = new Acknowledgement<Instrument>();
            if (string.IsNullOrEmpty(ins.Name))
            {
                ack.IsSuccess = false;
                ack.AddMessage("Analyser name field must be filled");
                return ack;
            }
            if ( string.IsNullOrEmpty(ins.SerialNumber))
            {
                ack.IsSuccess = false;
                ack.AddMessage("Serial number field must be filled");
                return ack;
            }
            if (ins.MachineType == 0)
            {
                ack.IsSuccess = false;
                ack.AddMessage("Value of Machine type is invalid");
                return ack;
            }
            if ( string.IsNullOrEmpty(ins.TanFolder))
            {
                ack.IsSuccess = false;
                ack.AddMessage("Tan Folder field must be filled");
                return ack;
            }
            if ( string.IsNullOrEmpty(ins.AstmFolder))
            {
                ack.IsSuccess = false;
                ack.AddMessage("Astm Folder field must be filled");
                return ack;
            }
            
            ack.IsSuccess = true;
            return ack;
        }
        #endregion
        #region Lab
        [HttpGet]
        public Acknowledgement<List<Laboratory>> GetLabs()
        {
            var ack = new Acknowledgement<List<Laboratory>>();
            ack.Data = listLaboratories.OrderBy(p=>p.Priority).ToList();
            ack.IsSuccess = true;
            return ack;
        }
        //Add or Update Lab
        [HttpPost]
        public Acknowledgement<Laboratory> AddOrUpdateLab(Laboratory lab)
        {
            var ack = new Acknowledgement<Laboratory>();
            //Validate
            var validate = ValidateLab(lab);
            if (validate.IsSuccess == false)
            {
                ack.ErrorMessage = validate.ErrorMessage;
                ack.IsSuccess = false;
                return ack;
            }
            //Kiểm tra Add or Update
            var checkLab = listLaboratories.Find(p => p.Id == lab.Id);
            if (checkLab == null)
            {
                lab.Id = listLaboratories.Count() + 1;
                lab.LisInstruments = new List<Instrument>();
                lab.LisInRouters = new List<Lis>();
                listLaboratories.Add(lab);
            }
            else
            {
                checkLab.Name = lab.Name;
                checkLab.TimeZoneId = lab.TimeZoneId;
                checkLab.Priority = lab.Priority;
            }
            ack.Data = lab;
            ack.IsSuccess = true;
            return ack;

        }
        //Delete lab
        [HttpPost]
        public Acknowledgement DeleteLab(int? id)
        {
            var ack = new Acknowledgement();
            //Check exist lab
            if (id == null)
            {
                ack.AddMessage("Lỗi");
                ack.IsSuccess = false;
                return ack;
            }
            var lab = listLaboratories.Find(p => p.Id == id);
            if (lab != null)
            {
                //Remove instrument and set Assign for instrument
                var idIns = lab.LisInstruments.Select(i => i.Id).ToList();
                var ist = listInstruments.Where(i => idIns.Contains(i.Id)).ToList();
                ist.ForEach(i =>
                {
                    i.IsAssigned = false;
                });
                //Remove lab
                listLaboratories.Remove(lab);
                //Set lisSystem candelete =true if all labs don'h have LIS
                foreach ( var lisLab in lab.LisInRouters)
                {
                    var checkExist = false;
                    foreach (var i in listLaboratories)
                    {
                        var lisInLab = i.LisInRouters.Find(x => x.LisSystem.Id == lisLab.LisSystem.Id);
                        if (lisInLab != null)
                        {
                            checkExist = true;
                            break;
                        }
                    }
                    if (!checkExist)
                    {
                        listLisSytem.Find(x => x.Id == lisLab.LisSystem.Id).CanDelete = true;
                    }
                }
                ack.IsSuccess = true;
                return ack;
            }
            ack.AddMessage("Không tìm thấy Lab");
            ack.IsSuccess = false;
            return ack;



        }
        [HttpGet]
        public Acknowledgement<List<Instrument>> GetInstrumentsForLab()
        {
            var ack = new Acknowledgement<List<Instrument>>();
            ack.Data= listInstruments.Where(p => p.IsAssigned == false).ToList();
            ack.IsSuccess = true;
            return ack;
        }
        [HttpPost]
        public Acknowledgement<List<Instrument>> AddInstrumentToLab(AddItemToLabModelView ins)
        {
            var ack = new Acknowledgement<List<Instrument>>();
            //Check exist Lab
            var lab = listLaboratories.Where(x => x.Id == ins.LabId).FirstOrDefault();
            if (lab != null)
            {
                var ist = listInstruments.Where(i => ins.ListItemsId.Contains(i.Id)).ToList();
                //Set Assign for Instrument

                ist.ForEach(i =>
                {
                    i.IsAssigned = true;
                });
                lab.LisInstruments.AddRange(ist);
                
                ack.Data = lab.LisInstruments.ToList();
                ack.IsSuccess = true;
                return ack;
            }
            ack.IsSuccess = false;
            
            return ack;
        }
        [HttpPost] 
        public Acknowledgement DeleteInstrumentInLab(int idLab,int idInstrument)
        {
            var ack = new Acknowledgement();
            //Check exist Lab
            var lab = listLaboratories.Find(x => x.Id == idLab);
            if (lab != null)
            {
                //Find Id of Instrument in Lab
                var insLab = lab.LisInstruments.Find(x => x.Id == idInstrument);
                //Find index of Instrument
                var ins = listInstruments.Find(x => x.Id == idInstrument);
                //Set Assign for Instrument and Remove instrument from Lab
                if (ins != null && insLab!=null)
                {
                    ins.IsAssigned = false;
                    lab.LisInstruments.Remove(insLab);
                }
                ack.IsSuccess = true;
                return ack;
            }
            ack.IsSuccess = false;
            return ack;
        }
        [HttpGet]
        public Acknowledgement<List<LisSystem>> GetLisSystemForLab(int idLab)
        {
            var ack = new Acknowledgement<List<LisSystem>>();
            //Get list of LisSystem in lab
            var lisInRouters = listLaboratories.Find(x => x.Id == idLab).LisInRouters.Select(p=>p.LisSystem.Id).ToList();
            var data = new List<LisSystem>();
            //Get list LisSystem is not in Lab's list of LisSystem 
            var lis = listLisSytem.Where(i => !lisInRouters.Contains(i.Id)).ToList();
            data.AddRange(lis);
            ack.Data = data;
            ack.IsSuccess = true;
            return ack;
        }
        [HttpPost]
        public Acknowledgement<List<Lis>> AddLisSystemToLab(AddItemToLabModelView lisSystems)
        {
            var ack = new Acknowledgement<List<Lis>>();
            var lab = listLaboratories.Where(x => x.Id == lisSystems.LabId).FirstOrDefault();
            if (lab != null)
            {
                var lis = listLisSytem.Where(i => lisSystems.ListItemsId.Contains(i.Id)).ToList();
                //Set Assign for Instrument
                foreach (var i in lis)
                {
                    //Create new Lis
                    var tmp = new Lis()
                    {
                        LisSystem = i,
                        IsMirror = false,
                        LisId = lab.LisInRouters.Count() + 1
                    };
                    //Set CanDelete for LisSystem
                    i.CanDelete = false;

                    lab.LisInRouters.Add(tmp);
                };
                
                ack.Data = lab.LisInRouters.ToList();
                ack.IsSuccess = true;
                return ack;
            }
            ack.IsSuccess = false;

            return ack;
        }
        [HttpPost]
        public Acknowledgement DeleteLisInLab(int idLab, int idLis)
        {
            var ack = new Acknowledgement();
            var indexLab = listLaboratories.FindIndex(x => x.Id == idLab);
            if (indexLab != -1)
            {
                
                var lab = listLaboratories.Find(x => x.Id == idLab);
                //Find Lis in lab
                var lisLab = lab.LisInRouters.Find(x => x.LisId == idLis);
               
                if (lisLab != null)
                {
                    //Remove Lis in Lab
                    lab.LisInRouters.Remove(lisLab);
                    var checkExist = false;
                    foreach (var i in listLaboratories)
                    {
                        var lisInLab = i.LisInRouters.Find(x => x.LisSystem.Id == lisLab.LisSystem.Id);
                        if (lisInLab != null)
                        {
                            checkExist = true;
                            break;
                        }
                    }
                    if (!checkExist)
                    {
                        listLisSytem.Find(x => x.Id == lisLab.LisSystem.Id).CanDelete = true;
                    }
                }
                ack.IsSuccess = true;
                return ack;
            }
            ack.IsSuccess = false;
            return ack;
        }
        [HttpPost]
        public Acknowledgement CheckMirrorLisInLab(int idLis,int idLab)
        {
            var ack = new Acknowledgement();
            var lab = listLaboratories.Find(p => p.Id == idLab);
            var lis = lab.LisInRouters.Find(p => p.LisId == idLis);
            if(lis!= null)
            {
                lis.IsMirror = !lis.IsMirror;
                ack.IsSuccess = true;
                return ack;
            }
            ack.IsSuccess = false;
            ack.AddMessage("Can not find LIS");
            return ack;
        }
        public Acknowledgement<Laboratory> ValidateLab(Laboratory lab)
        {
            var ack = new Acknowledgement<Laboratory>();
            if(string.IsNullOrEmpty(lab.Name))
            {
                ack.IsSuccess = false;
                ack.AddMessage("Lab name field must be filled");
                return ack;
            }
            if ( string.IsNullOrEmpty(lab.TimeZoneId))
            {
                ack.IsSuccess = false;
                ack.AddMessage("Value of TimeZone is invalid");
                return ack;
            }
            if (lab.Priority <= 0)
            {
                ack.IsSuccess = false;
                ack.AddMessage("Priority mus be greater than or equal to 1");
                return ack;
            }
            ack.IsSuccess = true;
            return ack;
        }
        #endregion


    }
}
