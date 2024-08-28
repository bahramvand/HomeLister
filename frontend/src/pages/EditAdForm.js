import { useLoaderData } from 'react-router-dom';
import AdForm from '../components/AdForm';

export default function EditAdFormPage() {
  const data = useLoaderData();
  console.log(data);
  const { address, description, location, phone } = data;

  return (
    <AdForm
      method="patch"
      address={address}
      description={description}
      location={location}
      phone={phone}
    />
  );
}
