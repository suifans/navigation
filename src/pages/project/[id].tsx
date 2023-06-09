import Header from "../../components/header";
import {Footer} from "../../components/foot";
import {Container} from "../../components/container";
import Link from "next/link";
import {client} from "../../client";
import {useEffect, useState} from "react";
import {Jost} from "next/dist/compiled/@next/font/dist/google";
import {useAtom} from "jotai";
import {DiscordUser} from "../../jotai";
import {https} from "../../constants";

const Project = (props) =>{
    const [discordUser,setDiscordUser] =useAtom(DiscordUser)
    const [numberData,setNumberData] = useState(false)
    const [number,setNumber] =useState('0')
    const [min_number,setMin_number] =useState('0')
    const project_details_list = JSON.parse(props.project_details)
    const project_details = project_details_list
    const project = {
        name:project_details.name,
        img:project_details.img,
        description:project_details.description,
        type:project_details.type,
        platform:project_details.platform,
        community:project_details.community,
        chains:project_details.chains,
        builders:project_details.builders,
        status:project_details.status,
        website:project_details.website,
        guildID:project_details.guildID,
        inviteLink:project_details.inviteLink

    }

    useEffect(()=>{
        const query = async () =>{
            const ret = await client.callApi('v1/Test/GetDcUserTestRulesNumber', {
                guild_id: JSON.parse(props.project_details).guildId

            });
            if(ret.isSucc){
                setNumber(JSON.parse(ret.res.rules)[0].number)
                setMin_number(JSON.parse(ret.res.rules)[0].min_number)
                setNumberData(true)
            }else{
                setNumberData(true)
            }


        }
        query()

    },[])

    const verify = async () =>{
        if(discordUser.username !==""){
            const ret = await client.callApi('v1/Test/AddDcUserTestRules', {
                user_id: discordUser.id,
                guild_id: JSON.parse(props.project_details).guildId

            });
                window.open(project.inviteLink,)
        }else {
            window.open('https://discord.com/oauth2/authorize?client_id=1085234510649622548&redirect_uri=http%3A%2F%2Flocalhost%3A3005%2F&response_type=code&scope=identify%20guilds',"_parent")
        }
    }
    return(
        <>
            <div className="bg-[#0B0B0B]">
                <Header/>
                <Container className="pt-24">
                    <div className="flex mt-10 justify-between items-center ">
                        <div>
                    <div className="text-4xl text-white font-semibold ">
                        {project.name}
                    </div>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {project.type.map((item=>(
                                    <div key={item.content} className="text-[#639DEE] font-semibold border border-[#639DEE] text-sm px-4 py-1 bg-[#171920] rounded-lg text-center">
                                        {item.content}
                                    </div>
                                )))}
                            </div>
                        </div>
                    <div className="flex ">
                    <Link href={project.website} legacyBehavior>
                        <a target="_blank" className="py-5 rounded-lg w-48 flex justify-center border h-12 text-white font-semibold items-center hover:bg-[#262626]" >
                            WEBSITE
                        </a>
                    </Link>
                    <button onClick={verify}  className="ml-5 rounded-lg w-48 flex justify-center border h-12 text-white font-semibold items-center hover:bg-[#262626]" >
                        Verify
                    </button>
                    </div>
                    </div>
                    <div className="flex gap-10">
                        <div className="flex justify-between items-center py-4">
                            <div className="font-light text-[#7A88AB] text-md font-semibold mr-2">
                                Platform
                            </div>
                            <div className="flex gap-3">
                                {project.platform.map(item=>(
                                    <img key={item.icon} className="w-5 h-5" src={item.icon} alt=""/>
                                ))}
                            </div>
                        </div>


                        <div className="flex justify-between items-center py-4">
                            <div className="font-light text-[#7A88AB] text-md font-semibold mr-2">
                                Community
                            </div>
                            <div className="flex gap-4">
                                {project.community.map(item=>(
                                    <a key={item.href} href={item.href}>
                                        <img  className="w-5 h-5 " src={item.img} alt=""/>
                                    </a>

                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-4">
                            <div className="font-light text-[#7A88AB] text-md font-semibold mr-2">
                                NetWork
                            </div>
                            <div className="flex gap-4">
                                {project.chains.map(item=>(
                                    <div key={item.name}>
                                        <img  className="w-5 h-5 " src={item.icon} alt=""/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-4">
                            <div className="font-light text-[#7A88AB] text-md font-semibold mr-2">
                                Developers
                            </div>
                            <div className="flex gap-4 text-white">
                                {project.builders}
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-4">
                            <div className="font-light text-[#7A88AB] text-md font-semibold mr-2">
                                Status
                            </div>
                            <div className="flex gap-4 text-white">
                                {project.status}
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <div className="font-light text-[#7A88AB] text-md font-semibold mr-2">
                                Number
                            </div>
                            <div className={numberData?"hidden":"animate-spin text-white"}>
                                <i className="fa fa-spinner f-spin fa-2x fa-fw"></i>
                            </div>
                            <div className={numberData?"flex gap-4 text-white":"hidden"}>
                                {min_number} / {number}
                            </div>
                        </div>

                    </div>
                    <img  className="rounded-xl w-full xl:h-104"  src={project.img} alt=""/>
                    <div className="text-white text-xl my-5">
                        Introduction
                    </div>
                    <div className="text-gray-400 font-[310] tracking-wider ">
                        {project.description}
                    </div>
                </Container>
                <Footer/>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    let data = {}
    const ret = await fetch(`${https}/v1/Project/GetAllProjectDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    const result = await ret.json()
    const project_details = JSON.parse(result.res.project_details)
    const paths = project_details.map((project: any)=>{
        return {
            params:{id:project.id}
        }
    })
    return {
        paths,
        fallback: false
    };
}
// //
export async function getStaticProps({params:{id}}){
    let data = {
        id:id
    }
    const ret = await fetch(`${https}/v1/Project/GetProjectDetails`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    const result = await ret.json()
    // const project_details = JSON.parse(result.res.project_details)
    // console.log(project_details.Name.title)
    let project_details = result.res.project_details
    return {
        props:{
            project_details
        }
    }
}

export  default Project
