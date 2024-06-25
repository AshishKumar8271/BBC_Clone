import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/setup";
import { toast } from "react-toastify";

const CommentBox = ({news}: {news:any}) => {
    const [comment, setComment] = useState('');
    const [commentsData, setCommentsData] = useState<any[] >([]);

    // function to add new comment to firestore database in comments collection inside the news collection.
    const addCommentToStore = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newsDoc = doc(db, 'news', news.publishedAt);
        const commentRef = collection(newsDoc, 'Comments');
        auth.currentUser == null && toast.error('Please login');
        try {
            auth.currentUser && await addDoc(commentRef, {
                comment: comment,
                name: auth.currentUser.displayName as string,
            })
        } catch (err) {
            console.log(err);
        }
        setComment('');
        showComments();
    }

    // function for profile logo in comments
    const getProfileUrl = (name: string) => {
        const userName = name.split(' ');
        const firstName = userName[0].charAt(0).toUpperCase();
        let lastName = userName.length > 1 ? userName[userName.length - 1] : '';
        lastName = lastName.charAt(0).toUpperCase();

        return firstName + lastName;
    }

    //function to show comments:
    const showComments = async () => {
        const newsDoc = doc(db, 'news', news.publishedAt);
        const commentRef = collection(newsDoc, 'Comments');
        try {
            const data = await getDocs(commentRef);
            const filterdData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                profilePic: getProfileUrl(doc.data().name),
            }));
            setCommentsData(filterdData);
        } catch (err) {
            console.log(err);
        }
    }


    // function to load comments on page load
    useEffect(() => {
        showComments();
    }, []);


    return (
        <div className="">
            {/* Add Comment Form */}
            <form className="" onSubmit={(e) => addCommentToStore(e)}>
                <label htmlFor="comments" className="font-bold block">Add Comment:</label>
                <input type="text" className="border p-2 rounded-md mr-3 w-2/3 focus-within:border-slate-300 outline-none max-w-[600px] bg-slate-100" value={comment} onChange={(e) => setComment(e.currentTarget.value)} required />
                <button type="submit" className="p-2 font-semibold tracking-wide px-3 border rounded-md bg-slate-100">Add</button>
            </form>


            {/* Comments */}
            <div className="mt-4 w-full">
                <h2 className='text-xl font-sans font-semibold underline mb-4 lg:text-2xl'>{commentsData.length} Comments</h2>
                {
                    commentsData.length > 0 ? commentsData.map((ele) => {
                        return (
                            <div className="flex items-center gap-2 mb-2" key={ele.id}>
                                <div className="flex w-8 h-8 bg-gray-400 rounded-full overflow-hidden items-center justify-center">
                                    <p className="text-xs font-semibold">{ele.profilePic}</p>
                                </div>
                                <div>
                                    <h3 className="text-stone-500 text-sm font-semibold">{ele.name}</h3>
                                    <p className="-mt-1.5 font-semibold">{ele.comment}</p>
                                </div>
                            </div>
                        )
                    }) :
                    <div className='text-center font-semibold text-xl mt-10'>
                        No any comments yet
                    </div>
                }   
            </div>
        </div>
    )
}

export default CommentBox;