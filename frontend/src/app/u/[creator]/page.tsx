import ClientPage from "./Clientpage";

interface Props {
  params: {
    creator: string;
  };
}

export default function Page({ params }: Props) {
  return <ClientPage creator={params.creator} />;
}
