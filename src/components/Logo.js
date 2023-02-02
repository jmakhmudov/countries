import Typography from "@mui/material/Typography"
import Link from "next/link"

export default function Logo() {
    return (
        <Typography
            variant='h6'
            noWrap
            sx={{
                mr: 2,
                fontWeight: 900,
                textDecoration: 'none',
                color: '#120D50'
            }}
        >
            <Link href="/">
                <p>{"[...countries]"}</p>
            </Link>
        </Typography>
    )
}