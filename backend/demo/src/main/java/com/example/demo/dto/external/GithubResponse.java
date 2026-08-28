//package com.example.demo.dto.external;
//
//public class GithubResponse {
//
//    private String username;
//    private String name;
//
//    private int publicRepos;
//    private int followers;
//    private int following;
//
//    private int score;
//
//    public GithubResponse() {
//    }
//
//    /*
//     * Current constructor
//     */
//    public GithubResponse(
//            String username,
//            String name,
//            int publicRepos,
//            int followers,
//            int following,
//            int score
//    ) {
//        this.username = username;
//        this.name = name;
//        this.publicRepos = publicRepos;
//        this.followers = followers;
//        this.following = following;
//        this.score = score;
//    }
//
//    /*
//     * Backward-compatible constructor.
//     *
//     * Existing GithubService is still calling this
//     * older constructor format.
//     *
//     * Extra values are currently ignored because they
//     * are not part of the current GithubResponse model.
//     */
//    public GithubResponse(
//            boolean success,
//            String username,
//            String name,
//            String value1,
//            String value2,
//            int publicRepos,
//            int followers,
//            int following,
//            int score,
//            int value3
//    ) {
//        this.username = username;
//        this.name = name;
//        this.publicRepos = publicRepos;
//        this.followers = followers;
//        this.following = following;
//        this.score = score;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public int getPublicRepos() {
//        return publicRepos;
//    }
//
//    public void setPublicRepos(int publicRepos) {
//        this.publicRepos = publicRepos;
//    }
//
//    public int getFollowers() {
//        return followers;
//    }
//
//    public void setFollowers(int followers) {
//        this.followers = followers;
//    }
//
//    public int getFollowing() {
//        return following;
//    }
//
//    public void setFollowing(int following) {
//        this.following = following;
//    }
//
//    public int getScore() {
//        return score;
//    }
//
//    public void setScore(int score) {
//        this.score = score;
//    }
//}

package com.example.demo.dto.external;

public class GithubResponse {

    private String login;
    private String name;

    private int publicRepos;
    private int followers;
    private int following;

    private double score;


    public GithubResponse() {
    }


    public GithubResponse(
            String login,
            String name,
            int publicRepos,
            int followers,
            int following,
            double score
    ) {

        this.login = login;
        this.name = name;
        this.publicRepos = publicRepos;
        this.followers = followers;
        this.following = following;
        this.score = score;
    }


    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public int getPublicRepos() {
        return publicRepos;
    }

    public void setPublicRepos(int publicRepos) {
        this.publicRepos = publicRepos;
    }


    public int getFollowers() {
        return followers;
    }

    public void setFollowers(int followers) {
        this.followers = followers;
    }


    public int getFollowing() {
        return following;
    }

    public void setFollowing(int following) {
        this.following = following;
    }


    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}