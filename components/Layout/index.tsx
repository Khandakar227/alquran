import { TextInput, Button, Box } from "@mantine/core";
import {GithubIcon} from '@radix-ui/react-icons'
import { useForm } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from 'next/router';
import { ReactElement } from "react";
import Bismillah from "../icons/Bismillah";
import SearchIcon from "../icons/search";
import Settings from "../Settings";
import ThemeMode from "../ThemeMode";
import styles from "./style.module.css";

function Layout({ children }: { children: ReactElement<any, any> }) {
  const searchForm = useForm({
    initialValues: {
      keyword: '',
    }
  })
  const router = useRouter();
  
  function onSearch (values={keyword: ''}) {
     if (values.keyword) {
	  router.push(`/search?keyword=${values.keyword}`);
	}
  }

  return (
    <>
      <div>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.dark,
            textAlign: "center",
            color: "white",
          })}
        >
          <h1 lang="ar"><Link href="/">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</Link></h1>
          {/* <Bismillah/> */}
        </Box>

        <form className={styles.form} onSubmit={searchForm.onSubmit(onSearch)}>
          <Settings />
          <ThemeMode/>
          <TextInput
            placeholder="Search for any word / text..."
            type="search"
            aria-label="search"
            size="md"
            {...searchForm.getInputProps('keyword')}
          />
          <Button size="md" color="dark" type="submit">
            <SearchIcon
              style={{ width: "60px", height: "60px", fill: "white" }}
            />
          </Button>
        </form>
      </div>
      {children}
    </>
  );
}

export default Layout;
