import { useRouteError } from "react-router-dom";
import { Button, Result, Typography } from "antd";
import { Link } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div className="my-32">
      <Result
        status="404"
        title="Oops!"
        subTitle={
          <Typography.Text strong className="text-xl">
            Sorry, an unexpected error has occurred.
          </Typography.Text>
        }
        extra={
          <>
            {error?.message && (
              <Typography.Text strong type="danger">
                <i>{error.statusText || error.message}</i>
              </Typography.Text>
            )}
            <br />
            <Link to="/">
              <Button type="primary" className="mt-4">
                Back to Home Page
              </Button>
            </Link>
          </>
        }
      />
    </div>
  );
}
