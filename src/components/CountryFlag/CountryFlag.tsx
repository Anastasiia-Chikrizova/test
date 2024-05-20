import { FC, useEffect, useState } from "react";

interface CountryFlagProps {
  countryCode: string | undefined;
}

const CountryFlag: FC<CountryFlagProps> = ({ countryCode }) => {
  const [countryFlag, setCountryFlag] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        if (countryCode) {
          const countryResponse = await fetch(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
          );

          if (!countryResponse.ok) {
            throw new Error("Failed to fetch country flag");
          }
          const countryData = await countryResponse.json();

          setCountryFlag(countryData[0].flags.png);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFlag();
  }, [countryCode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {countryFlag && !error ? (
        <img src={countryFlag} alt='Country flag' height='20' />
      ) : (
        <p>Flag not available</p>
      )}
    </>
  );
};

export default CountryFlag;
