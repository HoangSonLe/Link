using i3Solution.Library.Model;
using Link2.Web.Models;
using Link2.Web.ModelsView;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Net;
using System.Net.Http;
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
                Value = 0,
                Label = "None"
            },
            new Handshake()
            {
                Value = 1,
                Label = "XOnXOff"
            },
            new Handshake()
            {
                Value = 2,
                Label = "RequestToSend"
            },
            new Handshake()
            {
                Value = 3,
                Label = "RequestToSendXOnXOff"
            }
        };
        private static List<Parity> listParities = new List<Parity>()
        {
            new Parity()
            {
                Value = 0,
                Label = "None"
            },
            new Parity()
            {
                Value = 1,
                Label = "Odd"
            },
            new Parity()
            {
                Value = 2,
                Label = "Even"
            },
            new Parity()
            {
                Value = 3,
                Label = "Mark"
            },
            new Parity()
            {
                Value = 4,
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
                Value = 2,
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
                CanDelete = false,
                Id =  33,
                Image="serial.png",
                Name = "Serial Channel",
                CommunicationMode =  4001,
                ChannelId= 47,
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
                    StopBits = 3
              },
              FolderChannel = new FolderChannel(),
              TCPChannel = new TCPChannel(),
            },
            new LisSystem()
            {
                CanDelete = false,
                Id =  34,
                Name = "TCP Channel 233",
                Image="tcp.png",
                CommunicationMode =  4001,
                ChannelId= 47,
                IsActive = true,
                SendQCResult = true,
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
                    StopBits = 3
              },
              FolderChannel = new FolderChannel(),
              TCPChannel = new TCPChannel()
            },
            new LisSystem()
            {
                CanDelete = false,
                Id =  35,
                Name = "Folder Channel",
                Image="folder.png",
                CommunicationMode =  4001,
                ChannelId= 47,
                IsActive = true,
                SendQCResult = true,
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
                    StopBits = 3
              },
              FolderChannel = new FolderChannel(),
              TCPChannel = new TCPChannel()
            }
        };
        private static List<Instrument> listInstruments = new List<Instrument>()
        {
                new Instrument(){
                    Id = 1,
                    RouterId =1,
                    Image ="erytra.jpg",
                    MachineType =1,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\1-1",
                    AutoSendToHost =false,
                    CanDelete =true,
                    IsActive =true,
                    IsAssigned =false,
                    Name ="Erytra AT1000",
                    SerialNumber ="AT000001",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"
                },
                new Instrument(){
                    Id = 2,
                    RouterId =1,
                    Image ="dgreader.png",
                    MachineType =2,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\2-1",
                    AutoSendToHost =false,
                    CanDelete =true,
                    IsActive =true,
                    IsAssigned =true,
                    Name ="DGReader",
                    SerialNumber ="1560",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"
                },
                new Instrument(){
                    Id = 3,
                    RouterId =1,
                    Image ="diana.png",
                    MachineType =3,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\3-1",
                    AutoSendToHost =false,
                    CanDelete =true,
                    IsActive =true,
                    IsAssigned =false,
                    Name ="Waidiana3",
                    SerialNumber ="57-0694",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"
                },
                new Instrument(){
                    Id = 4,
                    RouterId =2,
                    Image ="erytra-eflexis.jpg",
                    MachineType =4,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\1-2",
                    AutoSendToHost =false,
                    CanDelete =true,
                    IsActive =true,
                    IsAssigned =false,
                    Name ="Eflexis",
                    SerialNumber ="0508",
                    TanFolder =@"C:\TestFolder\57-0694\TAN"
                },
                new Instrument(){
                    Id = 5,
                    RouterId =2,
                    Image ="dgreader-net.jpg",
                    MachineType =5,
                    AstmFolder =@"C:\TestFolder\57-0694\ASTM\1-2",
                    AutoSendToHost =false,
                    CanDelete =true,
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
                    LisInRouters =listLis.Where(i=>i.RouterID==1).ToList(),
                    Name ="Lab Vall",
                    Priority =1,
                    TimeZoneId ="Aleutian Standard Time",
                    LisInstruments =listInstruments.Where(i=>i.RouterId==1).ToList()
                },
                new Laboratory(){
                    Id =2,
                    LisInRouters =listLis.Where(i=>i.RouterID==2).ToList(),
                    Name ="Lab Test",
                    Priority =2,
                    TimeZoneId ="Romance Standard Time",
                    LisInstruments =listInstruments.Where(i=>i.RouterId==2).ToList()
                },
                new Laboratory(){
                    Id =3,
                    LisInRouters =listLis.Where(i=>i.RouterID==3).ToList(),
                    Name ="Lab 3",
                    Priority =2,
                    TimeZoneId ="Alaskan Standard Time",
                    LisInstruments =listInstruments.Where(i=>i.RouterId==3).ToList()
                }

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
                        SerialChannel = new SerialChannel(),
                        TCPChannel = new TCPChannel()
                    }
                },
                Instrument = new InstrumentModelView()
                {
                    InstrumentList = new List<Instrument>(),
                    NewInstrument = new Instrument()
                }
            };
            ack.IsSuccess = true;
            return ack;
        }
        #region LisSystems
        [HttpGet]
        public Acknowledgement<LisModelView> GetLisSystemData()
        {
            var ack = new Acknowledgement<LisModelView>();
            ack.Data = new LisModelView()
            {
                LisList = listLisSytem,
                NewLis = new LisSystem()
            };
            ack.IsSuccess = true;
            return ack;
        }
        [HttpGet]
        public Acknowledgement<List<LisSystem>> GetLisSystems()
        {
            var ack = new Acknowledgement<List<LisSystem>>();
            ack.Data = listLisSytem;
            ack.IsSuccess = true;
            return ack;
        }
        [HttpGet]
        public Acknowledgement<LisSystem> GetDefaultLis()
        {
            var ack = new Acknowledgement<LisSystem>();
            ack.Data = new LisSystem();
            ack.IsSuccess = true;
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
        #endregion
        #region Instrument
        [HttpGet]
        public Acknowledgement<InstrumentModelView> GetInstrumentData()
        {
            var ack = new Acknowledgement<InstrumentModelView>();
            ack.Data = new InstrumentModelView()
            {
                InstrumentList = listInstruments,
                NewInstrument = new Instrument()
            };
            ack.IsSuccess = true;
            return ack;
        }
        [HttpGet]
        public Acknowledgement<Instrument> GetDefaultInstrument()
        {
            var ack = new Acknowledgement<Instrument>();
            ack.Data = new Instrument();
            ack.IsSuccess = true;
            return ack;
        }
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
            if (id == null)
            {
                ack.AddMessage("Lỗi");
                ack.IsSuccess = false;
            }
            if (id!= null)
            {

                var tmp=listInstruments.Find(p=>p.Id== id);
                listInstruments.Remove(tmp);
                ack.IsSuccess = true;
            }
            return ack;
        }
        [HttpPost]
        public Acknowledgement<Instrument> AddOrUpdateInstrument(Instrument ins)
        {
            var ack = new Acknowledgement<Instrument>();
            if (ModelState.IsValid)
            {
                var index=listInstruments.FindIndex(p=>p.Id == ins.Id);
                if (index == -1)
                {
                    ins.Id = listInstruments.Count() + 1;
                    listInstruments.Add(ins);
                }
                else
                {
                    
                    listInstruments[index] = ins;
                }
                ack.Data = ins;
                ack.IsSuccess = true;
                return ack;
            }
            ack.AddMessage("Lỗi");
            ack.IsSuccess = false;
            return ack;
        }
        #endregion
        #region Lab
        [HttpGet]
        public Acknowledgement<LabModelView> GetLabData()
        {
            var ack = new Acknowledgement<LabModelView>();
            ack.Data = new LabModelView() {
                LabList = listLaboratories,
                NewLab = new Laboratory()
            };
            ack.IsSuccess = true;
            return ack;
        }
        public Acknowledgement<Laboratory> GetDefaultLab()
        {
            var ack = new Acknowledgement<Laboratory>();
            ack.Data = new Laboratory();
            ack.IsSuccess = true;
            return ack;
        }
        [HttpGet]
        public Acknowledgement<List<Laboratory>> GetLabs()
        {
            var ack = new Acknowledgement<List<Laboratory>>();
            ack.Data = listLaboratories;
            ack.IsSuccess = true;
            return ack;
        }
        #endregion


    }
}
