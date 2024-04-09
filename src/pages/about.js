import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useSession } from "next-auth/react"
import { Provider } from '@prisma/client';
import Button from "@mui/joy/Button"

const fetcher = (...args) => fetch(...args).then(res => res.json())

async function updateUser(url, {arg}) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

function getRandomInt() {
  return Math.floor(Math.random() * 1000000);
}

export default function About() {

  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWR(`/api/users/clurrpyr600005l05a6iquroc/datasources`, fetcher)
  const { trigger } =        useSWRMutation(`/api/users/clurrpyr600005l05a6iquroc/datasources`, updateUser);
  
  if(status == "loading" || isLoading) {
    return (<></>)
  }

  function add() {
    let r = getRandomInt();
    trigger([{id: `id-${r}`, name: `name-${r}`, provider: Provider.GoogleDrive}])
  }

  return (
    <>
      About {session.userId} 
    
      {data.map((d)=>(
        <>
          <p>{d.name}</p>
        </>
      ))}

      <Button
        onClick={add}
      >
        Add
      </Button>
    </>
  )
}