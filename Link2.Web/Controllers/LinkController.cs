using i3Solution.Library.Model;
using Link2.Web.Models;
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
              FolderChannel = new FolderChannel() {
                    Id = 0,
                    RootFolder = null,
                    InputFile = null,
                    OutputFile= null,
                    NeedAck = false
              },
              TCPChannel = new TCPChannel(){
                    Id= 0,
                    Ip= null,
                    Port= 0,
                    TimeOut = null
              },
            },
            new LisSystem()
            {
                CanDelete = false,
                Id =  34,
                Name = "Serial",
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
              FolderChannel = new FolderChannel() {
                    Id = 0,
                    RootFolder = null,
                    InputFile = null,
                    OutputFile= null,
                    NeedAck = false
              },
              TCPChannel = new TCPChannel(){
                    Id= 0,
                    Ip= null,
                    Port= 0,
                    TimeOut = null
              },
            },

        };

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
        public Acknowledgement<LisSystem> GetDefaultLis()
        {
            var ack = new Acknowledgement<LisSystem>();
            ack.Data = new LisSystem();
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
        public Acknowledgement<OptionsLisEdit> GetOptionsForListEdit()
        {
            var ack = new Acknowledgement<OptionsLisEdit>();
            ack.Data = new OptionsLisEdit()
            {
                BaudRate = listBaudRates,
                Handshake = listHandshakes,
                Parity = listParities,
                StopBits = listStopBitses,
                LisCommunationMode = listLisCommunationModes
            };
            ack.IsSuccess = true;
            return ack;
        }

        [HttpGet]
        public Acknowledgement<Laboratory> Test()
        {
            var ack = new Acknowledgement<Laboratory>();
            ack.IsSuccess = true;

            return ack;
        }
    }
}
