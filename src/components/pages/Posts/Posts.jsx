import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useParams } from "react-router-dom";
import PostCard from "../../cards/PostCard";
import "./posts.css";
import Dashboard_SubTitle from "../dashboardSubTitle/Dashboard_SubTitle";
import { useNavigate } from "react-router-dom";

const Posts = ({ showAddButton = true }) => {
  const { schoolId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const placeholderPosts = [
      {
        id: 1,
        content:
          "القُرآن ملاذ وأمان المؤمن من تولَّى عنه فقد أقبل على حياة موحشة ومن أقبل عليه بصدق أقبلت عليه من الله الرحمات وغمرته ألطافه بالعون والسداد وبركة الأوقات يدعوكم ملتقى القرآن الكريم في جامعة فلسطين التقنية خضوري لحضور لقاء ملاذُ الحافظين مع الشيخ موسى مدفع وذلك اليوم الاثنين عند الساعة التاسعة والنصف مساءً عبر تقنية زوم",
        title: "دعوة لحضور لقاء ملاذُ الحافظين",
        attachment: {
          url: "https://scontent.fjrs27-1.fna.fbcdn.net/v/t39.30808-6/441639189_1036342611364277_2818803549453965447_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NIxQPBgPobYQ7kNvgGKVQIC&_nc_zt=23&_nc_ht=scontent.fjrs27-1.fna&_nc_gid=AqBEV0xfBg3c8fWLp2muFd0&oh=00_AYDAnaRGVhC7C3yhdwKNT-dLPJXMFudoddp6bodhClc7ag&oe=673C372D",
        },
        user: {
          firstName: "أنسام",
          lastName: "جناجرة",
          profilePicture: "",
        },
        createdAt: new Date(),
      },
      {
        id: 2,
        content:
          "القُرآن ملاذ وأمان المؤمن من تولَّى عنه فقد أقبل على حياة موحشة ومن أقبل عليه بصدق أقبلت عليه من الله الرحمات وغمرته ألطافه بالعون والسداد وبركة الأوقات يدعوكم ملتقى القرآن الكريم في جامعة فلسطين التقنية خضوري لحضور لقاء ملاذُ الحافظين مع الشيخ موسى مدفع وذلك اليوم الاثنين عند الساعة التاسعة والنصف مساءً عبر تقنية زوم",
        title: "دعوة لحضور لقاء ملاذُ الحافظين",
        attachment: {
          url: "https://scontent.fjrs27-1.fna.fbcdn.net/v/t39.30808-6/441639189_1036342611364277_2818803549453965447_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NIxQPBgPobYQ7kNvgGKVQIC&_nc_zt=23&_nc_ht=scontent.fjrs27-1.fna&_nc_gid=AqBEV0xfBg3c8fWLp2muFd0&oh=00_AYDAnaRGVhC7C3yhdwKNT-dLPJXMFudoddp6bodhClc7ag&oe=673C372D",
        },
        user: {
          firstName: "أنسام",
          lastName: "جناجرة",
          profilePicture: "",
        },
        createdAt: new Date(),
      },
    ];

    setTimeout(() => {
      setPosts(placeholderPosts);
      setIsLoading(false);
    }, 1000);
  }, [schoolId]);

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Dashboard_SubTitle title="الأخبار" />
      <Container sx={{ mt: 4 }}>
        <IconButton
          color="primary"
          sx={{ position: "absolute", top: 20, left: 20 }}
          onClick={() => navigate("../PostForm")}
        >
          اضافة خبر جديد
          <AddIcon />
        </IconButton>
        {/* {showAddButton && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Button
              variant="contained"
              component={Link}
              to={"../PostForm"}
              className="add-post-button"
            >
              اضافة خبر جديد +
            </Button>
          </Stack>
        )} */}
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post.id} className="post-card-wrapper">
              <PostCard post={post} handleDeletePost={handleDeletePost} />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Posts;
